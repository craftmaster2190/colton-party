import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CurrentStateService} from "../state/current-state.service";
import {NgForOf, NgIf} from "@angular/common";
import {IsAdminComponent} from "../is-admin/is-admin.component";

@Component({
  selector: 'app-bingo-spinner',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    IsAdminComponent
  ],
  templateUrl: './bingo-spinner.component.html',
  styleUrl: './bingo-spinner.component.scss'
})
export class BingoSpinnerComponent implements OnChanges {

  @Input()
  drawnNumbers: number[] = [];
  @Input() mostRecentBingoNumber!: number;
  adminRecentNumbers: number[] = [];
  bingoLetters = ['B', 'I', 'N', 'G', 'O'];
  numberMap: Record<string, number[]> = {};
  @Input() bingoEnabled!: boolean;

  jokes: Record<number, string> = {
    // B1
    1: "Obi-Wan Kenobi / Are you B1 and only? / Pythagoreans said 1 is not a number, he's dead now",
    2: "The only even prime number / Minions say Betwo, Betwo, Betwo",
    3: "Three's a crowd / three billy goats gruff / Pump pump, his heart is B3, B3. (Beating)",
    4: "Before, not after / Four elements: Water, Earth, Fire, Air",
    5: "Once I caught a fish alive / B5 is Boron. (Element) More found in Meteoroids, pretty uncommon on Earth.",
    6: "Touchdown!",
    7: "Lucky 7",
    8: "I shoulda had a B8 / Tinder Date / Bate (Bait)",
    9: "Cloud 9 / Love Potion #9 / Not evil, he's B9. (Benign)",
    10: "I got B10 (bitten) by a mosquito / snake",
    11: "Legs 11",
    12: "Vitamin B12 shot and you;re ready to go",
    13: "Bakers dozen / Unlucky for some",
    14: "Valentine's Day",
    15: "Can't drive yet",
    // I16
    16: "Sweet 16",
    17: "Dancing queen; ABBA / Selfie queen",
    18: "Age of consent, voting, drinking, but not smoking.",
    20: "20:20 Vision. Just I20, not 420; calm down.",
    22: "I'm feeling 22, Taylor Swift",
    23: "23 and Me / Number of the Illuminati",
    24: "Two dozen /  In Brazil, the number 24 means gay / Jean Valjean (24601)",
    25: "Quarter century",
    26: "Iron (Element) FE / 26 letters in the alphabet",
    30: "Roman Numbers, it's triple X / Dirty 30 / Flirty 30 / Older crowd may remember 'No 30' or 'It's not over yet.' when the speaker is still talking. Newspapers used to write XXX when a story was done or 30.",
    // N31
    31: "In 31 states, it's legal to marry your cousin / Baskin Robbins 31 flavors.",
    33: "Who's seen The 33 (movie about miners in Chile)? / A normal human spine has  33 vertebrae. / Your old records would spin at 33 RPM.",
    34: "Rule 34 / Taylors Swift's Age / Colton's previous age / In The Count of Monte Cristo, Number 34 is Edmond Dantès prisoner number.",
    35: "35mm film / The 35 highest earning years to calculate Social Security benefits.",
    36: "Perfect score on the ACT. / Roulette has 36 numbers",
    37: "Arguably the funniest number. / Veritasium random number between 1-100: http://thirty-seven.org/",
    39: "John Wilkes Booth was born in 1839, Lee Harvey Oswald in 1939. In Japan, 3 is pronounced 'san', 9 is pronounced 'kyu'. NSankyu (And Sank You)",
    42: "Answer to life, the universe, and everything",
    45: "N45, once I caught a fish alive",
    // G46
    46: "The number of human chromosomes. / Joe Biden is the 46th President of the United States",
    47: "Agent 47 of the Hitman game / Atomic number of Silver.",
    48: "48 minutes in an NBA game / 48 contiguous states in the US",
    50: "Don't look a Gifty horse in the mouth. G50",
    52: "52 weeks in a year / 52 cards in a deck / 52 white keys on a piano",
    53: "The Grinch says, \"G, 53 years I've put up with it now. I must stop Christmas from coming... but how?\"",
    55: "In Thai, 5 is pronounced 'ha', so 555 is hahaha and G55 is gahaha",
    56: "Elvis '56, an Elvis Presley CD (The first track is Heartbreak Hotel)",
    59: "\"The 59th Street Bridge Song (Feelin' Groovy)\" was popularized by Simon & Garfunkel / 59 is the number of beads in a Catholic rosary. / Last minute in an hour",
    // Oh61
    60: "Lincoln was elected president in 1860, Kennedy in 1960. Lincoln was killed in Ford’s Theatre; Kennedy was killed riding in a Lincoln convertible made by the Ford Motor Company.",
    63: "Tickle me, 63 / Country code of the Philippines",
    66: "Clickity Click / Route 66 / The number of the beast",
    67: "Oh 67 (5309) Jenny, Jenny, who can I turn to?",
    69: "Everybody's favorite number",
    72: "1972, the year of the Watergate Scandal / Par on a golf course",
    73: "My love to you. Ham Radio operators used to finish their conversation with 73, meaning 'best regards'.",
    75: "Largest bingo number, we aren't playing to 90."
  }

  constructor(private readonly httpClient: HttpClient, private readonly stateService: CurrentStateService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.numberMap = {};
    [...changes["drawnNumbers"].currentValue].sort().forEach(num => {
      this.bingoBall(num);
    })
  }

  bingoBall(num: number) {
    const bingoLetter$ = this.bingoLetter(num);
    (this.numberMap[bingoLetter$] = this.numberMap[bingoLetter$] || []).push(num);
  }

  bingoLetter(num: number) {
    if (num <= 15) {
      return 'B';
    } else if (num <= 30) {
      return 'I';
    } else if (num <= 45) {
      return 'N';
    } else if (num <= 60) {
      return 'G';
    } else if (num <= 75) {
      return 'O';
    } else {
      throw new Error('Invalid number: ' + num);
    }
  }

  drawBingoNumber() {
    this.httpClient.put<number>(`/api/bingo/draw`, null).subscribe(drawnNumber => {
      this.adminRecentNumbers.push(drawnNumber);
      if (this.adminRecentNumbers.length > 5) {
        this.adminRecentNumbers.shift();
      }
      this.stateService.updateCurrentGameState();
    });
  }

  toggleBingo() {
    this.httpClient.put<void>(`/api/bingo/${this.bingoEnabled ? 'disable' : 'enable'}`, null).subscribe();
    this.bingoEnabled = !this.bingoEnabled;
  }

  clearBingo() {
    if (confirm("Clear Bingo?")) {
      this.httpClient.delete<void>(`/api/bingo/reset`).subscribe();
      this.adminRecentNumbers.length = 0;
    }
  }
}
