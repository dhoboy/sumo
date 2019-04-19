import React from 'react';
import {
  matchResults,
  wrestlerBaseInfo,
  wrestlerMap,
  rawWrestlerObj,
  rawTournamentMap,
} from '../types/types';

interface Props {
  wrestlers: wrestlerMap,
  goToWrestlerDetailPage: (wrestlerName: string) => void
}

/* ADD */
// search box at top to filter down result set

// maybe main page has more sumo info
// like rank definitions, terms, tournament schedule and the like
// splashy styles too. some line graphs and splashy styles.

class WrestlerList extends React.Component<Props, object> {
  drawSectionTitle() {
    return (
      <div>
        Wrestlers
      </div>
    );   
  }

  drawWrestlersList() {
    //console.log("this.props bababa?: ", this.props.wrestlers);
    
    const wrestlers = this.props.wrestlers;
    
    return (
      <div style={styles.wrestlerList}>
        {Object.keys(wrestlers).map(wrestlerName => {
          const wrestlerObj = wrestlers[wrestlerName];
          return (
            <div onClick={() => { this.props.goToWrestlerDetailPage(wrestlerName); }} 
              style={styles.wrestlerRow}>
              <img src={`https://www3.nhk.or.jp${wrestlerObj.image}`} />
              <div style={{ "textAlign": "left" }}> 
                <div style={styles.wrestlerName}>{wrestlerName}</div>
                <div style={styles.wrestlerJapaneseNameContainer}>
                  <img src={`https://www3.nhk.or.jp${wrestlerObj.name_ja}`} />
                </div>
                <div>{wrestlerObj.currentRank.rank}</div>
                <div>{` as of ${wrestlerObj.currentRank.asOf.toLocaleDateString('en-US', {month: "long", year: "numeric"})}`}</div>
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
        {this.drawSectionTitle()}
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
    "border": "1px solid #ccc",
    "display": "flex",
    "flex-direction": "row",
    "width": "60%",
    "alignItems": "center",
    "justifyContent": "center"
  },
  wrestlerJapaneseNameContainer: {
   
  },
  wrestlerStats: {
    
  },
  wrestlerName: {
    "fontSize": "16px"
  }
};

export default WrestlerList;
