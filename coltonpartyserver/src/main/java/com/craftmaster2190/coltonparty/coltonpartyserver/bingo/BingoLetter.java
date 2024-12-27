package com.craftmaster2190.coltonparty.coltonpartyserver.bingo;

import java.util.List;
import java.util.stream.IntStream;
import lombok.*;

@Getter
@RequiredArgsConstructor
public enum BingoLetter {
  B(1, 15),
  I(16, 30),
  N(31, 45),
  G(46, 60),
  O(61, 75);
  private final int min, max;

  public int columnSize() {
    if (this == N) {
      return 4;
    }
    return 5;
  }

  public List<Integer> numbers() {
    return IntStream.rangeClosed(min, max).boxed().toList();
  }
}
