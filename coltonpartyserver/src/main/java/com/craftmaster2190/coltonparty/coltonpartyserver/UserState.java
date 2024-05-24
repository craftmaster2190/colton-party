package com.craftmaster2190.coltonparty.coltonpartyserver;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Data;

@Data
public class UserState {
  private String myName;
  private final Map<String, Integer> myVotes = new ConcurrentHashMap<>();
}
