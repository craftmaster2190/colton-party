package com.craftmaster2190.coltonparty.coltonpartyserver;

import com.craftmaster2190.coltonparty.coltonpartyserver.bingo.BingoCard;
import com.github.benmanes.caffeine.cache.*;
import java.util.*;
import java.util.stream.*;
import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.web.bind.annotation.*;

import static com.craftmaster2190.coltonparty.coltonpartyserver.SessionFilter.session;


@RestController
@RequestMapping("/api")
public class StateController {

  private final LoadingCache<String, UserState> userStateCache = Caffeine.newBuilder().build(sessionId -> new UserState());

  private final GameState gameState = new GameState();

  @GetMapping("/me")
  public UserState getMe() {
    return userStateCache.get(session().getId());
  }

  @PutMapping("/me/name/{newName}")
  public void updateMe(@PathVariable String newName) {
    userStateCache.get(session().getId()).setMyName(newName);
  }

  @PutMapping("/me/vote/{voteName}/{voteValue}")
  public void voteFor(@PathVariable String voteName, @PathVariable Integer voteValue) {
    userStateCache.get(session().getId()).getMyVotes().put(voteName, voteValue);
  }

  @GetMapping("/state")
  public GameState getState() {
    return gameState;
  }

  @GetMapping("/attendees")
  public List<String> getAttendees() {
    return userStateCache.asMap().values().stream().map(UserState::getMyName).toList();
  }

  @PutMapping("/activity/{activityName}")
  public void addActivity(@PathVariable String activityName) {
    gameState.getCurrentActivities().add(activityName);
  }

  @DeleteMapping("/activity/{activityName}")
  public void removeActivity(@PathVariable String activityName) {
    gameState.getCurrentActivities().remove(activityName);
  }

  @PutMapping("/vote/{voteName}")
  public void addVote(@PathVariable String voteName) {
    gameState.getCurrentVotes().add(voteName);
  }

  @DeleteMapping("/vote/{voteName}")
  public void removeVote(@PathVariable String voteName) {
    gameState.getCurrentVotes().remove(voteName);
  }

  @PutMapping("/bingo/enable")
  public void enableBingo() {
    gameState.setBingoEnabled(true);
  }

  @PutMapping("/bingo/disable")
  public void disableBingo() {
    gameState.setBingoEnabled(false);
  }

  @PutMapping("/bingo/draw")
  public int drawBingo() {
    var availableNumbers = IntStream.rangeClosed(1, 75).boxed().collect(Collectors.toCollection(ArrayList::new));
    availableNumbers.removeAll(gameState.getDrawnBingoNumbers());
    var drawn = availableNumbers.get((int) (Math.random() * availableNumbers.size()));
    gameState.getDrawnBingoNumbers().add(drawn);
    gameState.setMostRecentBingoNumber(drawn);
    return drawn;
  }

  @PutMapping("/bingo/draw-rigged")
  public int drawBingoRigged() {
    var winner = 52;
    var numbers = new ArrayList<>(Arrays.asList(1, 3, 9, 12, 15, 17, 19, 25, 35, 37, 41, 46, 49 ,51, 60, 61, 72, 74));
    numbers.removeAll(gameState.getDrawnBingoNumbers());

    var drawn = (numbers.isEmpty()) ? winner : numbers.get((int) (Math.random() * numbers.size()));
    gameState.getDrawnBingoNumbers().add(drawn);
    gameState.setMostRecentBingoNumber(drawn);
    return drawn;
  }

  @DeleteMapping("/bingo/reset")
  public void resetBingo() {
    gameState.getDrawnBingoNumbers().clear();
    gameState.setMostRecentBingoNumber(null);
  }

  @GetMapping("/bingo/generate-card")
  public BingoCard generateBingoCard() {
    return BingoCard.generate();
  }

  @GetMapping("/votes")
  public Map<String, VoteResult> getVotes() {
    return userStateCache.asMap().values().stream().map(UserState::getMyVotes)
        .flatMap(map -> map.entrySet().stream())
        .collect(Collectors.groupingBy(Map.Entry::getKey, Collectors.collectingAndThen(Collectors.toList(), list -> {
          var count = list.size();
          var sum = list.stream().mapToInt(Map.Entry::getValue).sum();
          return new VoteResult().setCountOfVotes(count).setAverageVote(sum / (double) count);
        })));
  }
}
