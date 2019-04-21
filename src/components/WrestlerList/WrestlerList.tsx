import React from 'react';
import {
  matchResults,
  wrestlerBaseInfo,
  wrestlerMap,
  rawWrestlerObj,
  rawTournamentMap,
  tournamentMap,
  tournamentMetadataMap,
  tournamentMetadata,
  techniques,
  matchups
} from '../../types/types';

import TrendLine from '../TrendLine/TrendLine';

interface Props {
  wrestlers: wrestlerMap,
  goToWrestlerDetailPage: (wrestlerName: string) => void
  formData: (wrestlerName: string) => {
    tournaments: tournamentMap,
    tournamentsMetadata: tournamentMetadataMap,
    matchups: matchups,
    techniques: techniques
   }
}

/* ADD */
// search box at top to filter down result set

// maybe main page has more sumo info
// like rank definitions, terms, tournament schedule and the like
// splashy styles too. some line graphs and splashy styles.

class WrestlerList extends React.Component<Props, object> {
  drawWrestlersList() {    
    const wrestlers = this.props.wrestlers;
    
    return (
      <div style={styles.wrestlerList}>
        {Object.keys(wrestlers).map(wrestlerName => {
          const wrestlerObj = wrestlers[wrestlerName];
          const wrestlerData = wrestlers[wrestlerName];
          let {
            tournaments,
            tournamentsMetadata,
            matchups,
            techniques
          } = this.props.formData(wrestlerName);

          let mostRecentTournament = Object.keys(tournaments).sort((a, b) => {
            let aDate = new Date(a.split("_").join(" "));
            let bDate = new Date(b.split("_").join(" "));
            return Number(bDate) - Number(aDate);
          })[0];

          const tournamentData = tournaments[mostRecentTournament];
          const tournamentMetadata: tournamentMetadata = tournamentsMetadata[mostRecentTournament];
          
          let tournamentDisplayNameParts = tournamentMetadata.name.split("_");
          let tournamentDisplayName = tournamentDisplayNameParts[0].charAt(0).toUpperCase() + 
            tournamentDisplayNameParts[0].slice(1) + " " +
            tournamentDisplayNameParts[1];
          

          let rankDisplay = (
            <div>
              <div>{wrestlerObj.currentRank.rank}</div>
              {wrestlerObj.currentRank.rank.toLowerCase() !== 'yokozuna' && 
                <div>
                  {`(${wrestlerObj.currentRank.asOf.toLocaleDateString('en-US', {month: "long", year: "numeric"})})`}
                </div>
              }
            </div>
          );

          return (
            <div onClick={() => { this.props.goToWrestlerDetailPage(wrestlerName); }} 
              style={styles.wrestlerRow}>
              <img style={styles.wrestlerPhoto} src={`https://www3.nhk.or.jp${wrestlerObj.image}`} />
              <div style={{ "textAlign": "left" }}> 
                <div style={styles.wrestlerName}>{wrestlerName}</div>
                <div style={styles.wrestlerJapaneseNameContainer}>
                  <img src={`https://www3.nhk.or.jp${wrestlerObj.name_ja}`} />
                </div>
                {rankDisplay}
              </div>
              <div style={{ "textAlign": "center" }}>
                <div style={styles.graphAndKey}>
                  <div style={styles.graphKeys}>
                    <div style={styles.graphKey}>win</div>
                    <div style={styles.graphKey}>loss</div>
                  </div>
                  <TrendLine
                    tournamentData={tournamentData} 
                    wrestlerName={wrestlerName}
                    tournamentMetadata={tournamentMetadata}
                    pageLocation={Math.random().toString(36).slice(2)}
                  />
                </div>
                <div style={styles.graphDateLabel}>
                  {tournamentDisplayName}
                </div>
              </div>
            </div>
          );  
        })}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.drawWrestlersList()}
      </div>
    );
  }
}

const styles = {
  wrestlerList: {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
    "marginTop": "15px"
  },
  wrestlerRow: {
    "display": "flex",
    "flex-direction": "row",
    "width": "60%",
    "alignItems": "center",
    "marginBottom": "10px",
    "cursor": "pointer"
  },
  wrestlerJapaneseNameContainer: {
   
  },
  wrestlerStats: {
    
  },
  wrestlerPhoto: {
    "marginRight": "20px",
    "border": "2px solid #000",
    "borderRadius": "90px"
  },
  wrestlerName: {
    "fontSize": "18px"
  },
  graphAndKey: {
    "display": "flex",
    "flex-direction": "row"
  },
  graphKeys: {
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "space-around"
  },
  graphKey: {
    "fontSize": "12px"
  },  
  graphDateLabel: {
    "fontSize": "12px"
  }
};

export default WrestlerList;
