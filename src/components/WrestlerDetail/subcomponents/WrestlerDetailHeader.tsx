import React from 'react';

import {
  wrestlerBaseInfo, 
  techniques,
  tournamentMap,
  tournamentSummaryDataMap,
  matchups
} from '../../../types/types';

import TopTechniques from '../../TopTechniques/TopTechniques';
import TopOpponents from '../../TopOpponents/TopOpponents';
import TrendLine from '../../TrendLine/TrendLine';

interface Props {
  wrestlerName: string;
  wrestlerData: wrestlerBaseInfo;
  techniques: techniques;
  tournaments: tournamentMap;
  tournamentsSummaryData: tournamentSummaryDataMap;
  matchups: matchups
}

const WrestlerDetailHeader: React.FunctionComponent<Props> = ({
  wrestlerName,
  wrestlerData,
  techniques,
  tournaments,
  tournamentsSummaryData,
  matchups
}) => {
  let rankDisplay = `Rank: ${wrestlerData.currentRank.rank}`;
  if (wrestlerData.currentRank.rank.toLowerCase() !== 'yokozuna') {
    rankDisplay += ` (${wrestlerData.currentRank.asOf.toLocaleDateString('en-US', {month: "long", year: "numeric"})})`;
  }

  return (
    <div id="wrestlerDetailHeader">
      <div className="wrestlerDetailHeaderInfo">
        <div className="wrestlerNameAndPhoto">
          <img className="wrestlerPhoto" src={`https://www3.nhk.or.jp${wrestlerData.image}`} />
          <div className="wrestlerEnglishName">{wrestlerName}</div>
          <div>{rankDisplay}</div>
          <div className="wrestlerJapaneseName">
            <div className="wrestlerJapaneseNameImgContainer"
              style={{ "backgroundImage": `url(https://www3.nhk.or.jp${wrestlerData.name_ja})` }}>
            </div>
          </div>          
        </div>
        <div>
          <TopTechniques
            techniques={techniques}
          />
          <TopOpponents
            matchups={matchups}
          />
        </div>
      </div>
      <div className="wrestlerDetailHeaderGraphs">
        {Object.keys(tournaments).sort((a, b) => {
          let aDate = new Date(a.split("_").join(" "));
          let bDate = new Date(b.split("_").join(" "));
          return Number(aDate) - Number(bDate);
        }).map(tournament => {
          let tournamentData = tournaments[tournament];
          let tournamentSummaryData = tournamentsSummaryData[tournament];
          let tournamentDisplayNameParts = tournamentSummaryData.name.split("_");
          let tournamentDisplayName = tournamentDisplayNameParts[0].charAt(0).toUpperCase() + 
            tournamentDisplayNameParts[0].slice(1) + " " +
            tournamentDisplayNameParts[1];
          
          return (
            <div className="wrestlerDetailHeaderGraphAndLabel">
              <TrendLine
                tournamentData={tournamentData} 
                wrestlerName={wrestlerName}
                tournamentSummaryData={tournamentSummaryData}
                pageLocation={"header"}
              />
              <div className="wrestlerDetailHeaderGraphLabel">
                {tournamentDisplayName}
              </div>
            </div>
          );
        })}
      </div>        
    </div>
  );
}

export default WrestlerDetailHeader;
