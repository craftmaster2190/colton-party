package com.craftmaster2190.coltonparty.coltonpartyserver;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class VoteResult{
  private int countOfVotes;
  private double averageVote;
}
