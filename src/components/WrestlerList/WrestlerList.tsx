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
import PunchCard from '../PunchCard/PunchCard';

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
// maybe main page has more sumo info
// like rank definitions, terms, tournament schedule and the like

class WrestlerList extends React.Component<Props, object> {
  state = {
    filterText: "",
    sortType: "rank",
    sortDirection: "asc"
  }

  setSortType(e: any) {
    this.setState({
      "sortType": e.target.value
    });
  }

  setSortDirection(e: any) {
    this.setState({
      "sortDirection": e.target.value
    });
  }
  
  wrestlerRankSort(
      rankA: string, 
      rankB: string, 
      nameA: string, // if 2 wrestlers same rank, 
      nameB: string, // fall back to name sorting
      direction: string) {
  
    const hierarchy: {
      [key: string]: number;
    } = {
      "yokozuna": 6,
      "ozeki": 5,
      "sekiwake": 4,
      "komusubi": 3,
      "maegashira": 2,
      "juryo": 1
    };
    
    // maegashira / juryo sorting
    if ((rankA.indexOf("maegashira") > -1 && rankB.indexOf("maegashira") > -1) || 
        (rankA.indexOf("juryo") > -1 && rankB.indexOf("juryo") > -1)) {
      
      const a: number = +rankA.split("#")[1];
      const b: number = +rankB.split("#")[1];
      
      if (a === b) { // wrestlers are same rank
        // fall back to alphabetical sort
        return this.wrestlerAlphabeticalSort(nameA, nameB, direction);
      }

      if (direction === "asc") {
        return a - b;
      } else {
        return b - a;
      }
    } else { // sorting different ranks
      let a: number = 0;
      let b: number = 0;

      if ((rankA.indexOf("maegashira") > -1) || (rankA.indexOf("juryo") > -1)) {
        a = hierarchy[rankA.split(" ")[0]];
      } else {
        a = hierarchy[rankA];
      }

      if ((rankB.indexOf("maegashira") > -1) || (rankB.indexOf("juryo") > -1)) {
        b = hierarchy[rankB.split(" ")[0]];
      } else {
        b = hierarchy[rankB];
      }

      if (a === b) { // wrestlers are same rank
        // fall back to alphabetical sort
        return this.wrestlerAlphabeticalSort(nameA, nameB, direction);
      }

      if (direction === "asc") {
        return b - a;
      } else  {
        return a - b;
      }
    } 
  }

  wrestlerAlphabeticalSort(nameA: string, nameB: string, direction: string) {
    if (direction === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  }
  
  drawWrestlersList() {    
    const wrestlers = this.props.wrestlers;

    const wrestlersList = Object.keys(wrestlers).filter(wrestlerName => {
      return wrestlerName.toLowerCase().indexOf(this.state.filterText.toLowerCase()) > -1;
    });

    if (wrestlersList.length === 0) {
      return (
        <div style={styles.wrestlerList}>
          <div style={styles.inputArea}>
            <div>Filter by Wrestler Name</div>
            <input 
              type="text"
              style={styles.filterInput}
              onChange={(e) => {
                console.log("onchange!");
                this.setState({
                  filterText: e.target.value
                });
              }}
              value={this.state.filterText}
            />
            <div>No Wrestlers Match Your Search Term!</div>
          </div>
        </div>
      );
    }
    
    return (
      <div style={styles.wrestlerList}>
        <div style={styles.inputArea}>
          <div>Filter by Wrestler Name</div>
          <input 
            type="text"
            style={styles.filterInput}
            onChange={(e) => {
              console.log("onchange!");
              this.setState({
                filterText: e.target.value
              });
            }}
            value={this.state.filterText}
          />
          <div style={styles.sortSelects}>
            <div style={styles.sortBy}>
              <div style={styles.sortSelectLabel}>
                Sort By
              </div>
              <select 
                value={this.state.sortType}
                onChange={this.setSortType.bind(this)} 
                style={styles.sortSelect}>
                <option value="alphabetical">Alphabetical</option>
                <option value="rank">Rank</option>          
              </select>
            </div>
            <div>
              <div style={styles.sortSelectLabel}>
                Sort Direction
              </div>
              <select 
                value={this.state.sortDirection}
                onChange={this.setSortDirection.bind(this)} 
                style={styles.sortSelect}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        {wrestlersList.sort((a, b) => {
          const wrestlerDataA = wrestlers[a];
          const wrestlerDataB = wrestlers[b];
          let sortResult: number = 0;
          switch (this.state.sortType) {
            case "rank":
              sortResult = this.wrestlerRankSort(
                wrestlerDataA.currentRank.rank.toLowerCase(),
                wrestlerDataB.currentRank.rank.toLowerCase(),
                wrestlerDataA.name.toLowerCase(),
                wrestlerDataB.name.toLowerCase(),
                this.state.sortDirection
              );
              break;
            case "alphabetical": 
              sortResult = this.wrestlerAlphabeticalSort(
                wrestlerDataA.name.toLowerCase(),
                wrestlerDataB.name.toLowerCase(),
                this.state.sortDirection
              );
              break;
          }
          return sortResult;
        }).map(wrestlerName => {
          const wrestlerObj = wrestlers[wrestlerName];

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
            <div key={wrestlerName}
              onClick={() => { this.props.goToWrestlerDetailPage(wrestlerName); }} 
              style={styles.wrestlerRow}>
              <img style={styles.wrestlerPhoto} src={`https://www3.nhk.or.jp${wrestlerObj.image}`} />
              <div style={{ "textAlign": "left" }}> 
                <div style={styles.wrestlerName}>{wrestlerName}</div>
                <div>
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
                  <PunchCard
                    baba={"adsfsad"}
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
    return (<div>wrestler list re-write!</div>)
    /*return (
      <div>
        {this.drawWrestlersList()}
      </div>
    );*/
  }
}

const styles = {
  inputArea: {
    "width": "100%",
    "text-align": "center"
  },
  filterInput: {
    "border": "2px solid #ccc",
    "borderRadius": "4px",
    "padding": "5px",
    "fontSize": "16px",
    "margin": "5px 0 10px 0",
    "width": "50%"
  },
  sortSelects: {
    "display": "flex",
    "flex-direction": "row",
    "justify-content": "center",
    "marginBottom": "25px"
  },
  sortSelect: {
    "borderRadius": "10px",
    "fontSize": "14px",
    "border": "2px solid #ccc",
    "background-color": "#fff"
  },
  sortSelectLabel: {
    "fontSize": "12px"
  },
  sortBy: {
    "marginRight": "20px"
  },
  wrestlerList: {
    "display": "flex",
    "flex-direction": "column",
    "alignItems": "center",
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
