import React from 'react';

import {
  wrestlerBaseInfo, 
  techniques,
  tournamentMap,
  tournamentMetadataMap
} from '../../../types/types';

import TopTechniques from '../../TopTechniques/TopTechniques';
import TrendLine from '../../TrendLine/TrendLine';

interface Props {
  wrestlerName: string;
  wrestlerData: wrestlerBaseInfo;
  techniques: techniques;
  tournaments: tournamentMap;
  tournamentsMetadata: tournamentMetadataMap;
}

class WrestlerDetailHeader extends React.Component<Props, object> {
  render() {
    const {
      wrestlerName,
      wrestlerData,
      techniques,
      tournaments,
      tournamentsMetadata
    } = this.props;
    
    return (
      <div id="wrestlerDetailHeader">
        <div className="wrestlerDetailHeaderInfo">
          <div className="wrestlerNameAndPhoto">
            <img className="wrestlerPhoto" src={`https://www3.nhk.or.jp${wrestlerData.image}`} />
            <div className="wrestlerEnglishName">{wrestlerName}</div>
            <div className="wrestlerJapaneseName">
              <div className="wrestlerJapaneseNameImgContainer"
                style={{ "backgroundImage": `url(https://www3.nhk.or.jp${wrestlerData.name_ja})` }}>
            </div>
          </div>          
        </div>
          <TopTechniques
            techniques={techniques}
          />
        </div>
        <div className="wrestlerDetailHeaderGraphs">
          {Object.keys(tournaments).sort((a, b) => {
            let aDate = new Date(a.split("_").join(" "));
            let bDate = new Date(b.split("_").join(" "));
            return Number(aDate) - Number(bDate);
          }).map(tournament => {
            let tournamentData = tournaments[tournament];
            let tournamentMetadata = tournamentsMetadata[tournament];
            let tournamentDisplayNameParts = tournamentMetadata.name.split("_");
            let tournamentDisplayName = tournamentDisplayNameParts[0].charAt(0).toUpperCase() + 
              tournamentDisplayNameParts[0].slice(1) + " " +
              tournamentDisplayNameParts[1];
            
            return (
              <div className="wrestlerDetailHeaderGraphAndLabel">
                <TrendLine
                  tournamentData={tournamentData} 
                  wrestlerName={wrestlerName}
                  tournamentMetadata={tournamentMetadata}
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
}

export default WrestlerDetailHeader;
