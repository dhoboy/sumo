export const sortWrestlers = (wrestlers, direction, type) => {
  if (type === "rank") {
    return rankSort(wrestlers, direction);
  } else {
    return nameSort(wrestlers, direction);
  }
}

const rankSort = (wrestlers, direction) => {
  const hierarchy = {
    "yokozuna": 6,
    "ozeki": 5,
    "sekiwake": 4,
    "komusubi": 3,
    "maegashira": 2,
    "juryo": 1
  };
  
  return Object.values(wrestlers).sort((a, b) => {
    const fullRankA = a.currentRank.rank.toLowerCase(); // magaeshira 12 or yokozuna or whatever
    const fullRankB = b.currentRank.rank.toLowerCase();

    // maegashira / juryo sorting
    if ((fullRankA.indexOf("maegashira") > -1 && fullRankB.indexOf("maegashira") > -1) || (fullRankA.indexOf("juryo") > -1 && fullRankB.indexOf("juryo") > -1)) {
      const rankA = +fullRankA.split("#")[1]; // number
      const rankB = +fullRankB.split("#")[1]; // number

      if (rankA === rankB) { // wrestlers are same rank, so both Mageashira 12's for example
        // fall back to alphabetical sort, but always prefer ascending order in this case
        return alphabeticalCompare(a.name, b.name, "asc");
      }

      // same level, but different ranks, so like Magaeshira 12 and Magaeshira 8
      return numericalCompare(rankA, rankB, direction);

    } else { // sorting different ranks
      let rankA = 0; // number
      let rankB = 0; // number

      if ((fullRankA.indexOf("maegashira") > -1) || (fullRankA.indexOf("juryo") > -1)) {
        rankA = hierarchy[fullRankA.split(" ")[0]];
      } else {
        rankA = hierarchy[fullRankA];
      }

      if ((fullRankB.indexOf("maegashira") > -1) || (fullRankB.indexOf("juryo") > -1)) {
        rankB = hierarchy[fullRankB.split(" ")[0]];
      } else {
        rankB = hierarchy[fullRankB];
      }

      if (rankA === rankB) { // wrestlers are same rank
        // fall back to alphabetical sort, but always prefer ascending order in this case
        return alphabeticalCompare(a.name, b.name, "asc");
      }

      return numericalCompare(rankA, rankB, direction);
    } 
  });
};

const nameSort = (wrestlers, direction) => {
  return Object.values(wrestlers).sort((a, b) => {
    return alphabeticalCompare(a.name, b.name, direction);
  });
};

const alphabeticalCompare = (a, b, direction) => {
  if (direction === "asc") {
    return a.localeCompare(b);
  } else {
    return b.localeCompare(a);
  }
};

const numericalCompare = (a, b, direction) => {
  if (direction === "asc") {
    return a - b;
  } else {
    return b - a;
  }
};
