// raw data
export interface rawWrestlerObj {
  image: string,
  name: string,
  name_ja: string,
  perform: string,
  rank: string,
  result: string
};

export interface rawTournamentMap {
  [key: string]: { // july_2018, ...
    [key: string]: { // day1, ...
      east: rawWrestlerObj,
      technique: string,
      west: rawWrestlerObj
    }[]
  }[];
};

// formed data
export interface wrestlerMap {
  [key: string]: wrestlerBaseInfo
};

export interface wrestlerRank {
  asOf: Date;
  rank: string;
}

export interface wrestlerBaseInfo {
  image: string;
  name: string;
  name_ja: string;
  currentRank: wrestlerRank;
  division: string; // east or west
  results: matchResults[];
};

export interface matchResults {
  [key: string]: match // day1, day2... : match 
};

export interface match {
  winner: string;
  loser: string;
  technique: string;
  winnerRank: string;
  loserRank: string;
  recordSoFar: string;
}

export interface tournamentMap {
  [key: string]: { // january_2019, ...
    [key: string]: match
  }
}

export interface tournamentSummaryDataMap {
  [key: string]: tournamentSummaryData // january_2019, ... : tournamentSummaryData
}

export interface tournamentSummaryData {
  name: string;
  tournamentRank: string;
  wins: number;
  losses: number;
}

export interface matchups {
  [key: string]: { // opponent name
    results: { 
      tournament: string; // july_2018, ...
      day: string; // day1, ...
      result: string; // win or loose
      opponent: string;
      opponentRank: string;
      technique: string;
    }[];
    totalWins: number;
    totalLosses: number;
  }
}

export interface techniques {
  [key: string]: { // technique name
    winsBy: number;
    lossesBy: number;
  };
}

// app pages
export type page = "WrestlerList" | "WrestlerDetail";

// line generator
export type lineGenerator = {
  day: number;
  value: number;
  filterThisOut?: boolean;
}
