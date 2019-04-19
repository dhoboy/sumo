import { number } from "prop-types";

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
  [key: string]: { // july_2018_day1, ...
    data: {
      east: rawWrestlerObj,
      technique: string,
      west: rawWrestlerObj
    }[]
  };
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
  [key: string]: { // day1, day2...
    winner: string;
    loser: string;
    technique: string;
    winnerRank: string;
    loserRank: string;
    recordSoFar: string;
  }
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

export interface tournamentMetadataMap {
  [key: string]: {// january_2019, ... 
    name: string;
    tournamentRank: string;
    wins: number;
    losses: number;
  }
}

// app pages
export type page = "WrestlerList" | "WrestlerDetail";

// line generator
export type lineGenerator = {
  day: number;
  value: number;
  filterThisOut?: boolean;
}
