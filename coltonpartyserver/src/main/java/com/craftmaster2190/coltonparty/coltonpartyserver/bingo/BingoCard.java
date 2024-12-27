package com.craftmaster2190.coltonparty.coltonpartyserver.bingo;

import com.fasterxml.jackson.annotation.*;
import java.util.*;
import lombok.Getter;

public class BingoCard {
  public final static int MIDDLE = -1;
  @Getter
  @JsonUnwrapped
  private final Map<BingoLetter, int[]> grid = new HashMap<>();

  {
    // Init middle
    getColumn(BingoLetter.N)[2] = MIDDLE;
  }

  static <T> List<T> drawRandom(List<T> list, int count) {
    List<T> copy = new ArrayList<>(list);
    Collections.shuffle(copy);
    return copy.subList(0, count);
  }

  public static BingoCard generate() {
    BingoCard bingoCard = new BingoCard();
    for (BingoLetter letter : BingoLetter.values()) {
      var randomNumbers = new ArrayList<>(drawRandom(letter.numbers(), letter.columnSize()));
      if (letter == BingoLetter.N) {
        randomNumbers.add(2, MIDDLE);
      }
      for (int i = 0; i < randomNumbers.size(); i++) {
        bingoCard.add(letter, i, randomNumbers.get(i));
      }
    }
    return bingoCard;
  }

  @JsonIgnore
  public BingoCard add(BingoLetter letter, int row, int number) {
    var column = getColumn(letter);
    column[row] = number;
    return this;
  }

  @JsonIgnore
  public int[] getColumn(BingoLetter letter) {
    return grid.computeIfAbsent(letter, k -> new int[5]);
  }

  public String toString() {
    var row = "%2s   %2s   %2s   %2s   %2s";
    var builder = new ArrayList<String>(6);
    builder.add(row.formatted(Arrays.stream(BingoLetter.values()).map(Enum::name).toArray()));
    for (int rowIndex = 0; rowIndex <= 4; rowIndex++) {
      final var rowIndex$ = rowIndex;
      builder.add(row.formatted(Arrays.stream(BingoLetter.values()).map(letter -> grid.get(letter)[rowIndex$]).toArray()));
    }
    return String.join("\n", builder);
  }

  @Override
  public boolean equals(Object obj) {
    return obj instanceof BingoCard && toString().equals(obj.toString());
  }

  @Override
  public int hashCode() {
    return toString().hashCode();
  }
}

