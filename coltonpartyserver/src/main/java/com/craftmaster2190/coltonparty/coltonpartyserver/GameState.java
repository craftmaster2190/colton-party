package com.craftmaster2190.coltonparty.coltonpartyserver;

import java.util.*;
import java.util.concurrent.*;
import lombok.Data;

@Data
public class GameState {
  private final Deque<String> currentActivities = new ConcurrentLinkedDeque<>();
  private final Deque<String> currentVotes = new ConcurrentLinkedDeque<>();
  private volatile boolean bingoEnabled = false;
  private final Set<Integer> drawnBingoNumbers = ConcurrentHashMap.newKeySet();
  private volatile Integer mostRecentBingoNumber;
}
