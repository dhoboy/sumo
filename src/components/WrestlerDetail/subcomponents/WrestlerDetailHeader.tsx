import React from 'react';

import {
  wrestlerBaseInfo, 
  techniques,
} from '../../../types/types';

import TopTechniques from '../../TopTechniques/TopTechniques';

//import '../WrestlerDetail.css';


interface Props {
  wrestlerName: string;
  wrestlerData: wrestlerBaseInfo;
  techniques: techniques;
}

class WrestlerDetailHeader extends React.Component<Props, object> {
  render() {
    const {
      wrestlerName,
      wrestlerData,
      techniques
    } = this.props;
    
    return (
      <div id="wrestlerDetailHeader">
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
        <div className="maybe" style={{ display: "none" }}>
          <div>Loves to Face: Kotoshogiku</div>
          <div>Has won 90% of matches against</div>
          <div>Hates to Face: Hakuho</div>
          <div>Has lost 90% of matches against</div>
        </div>
      </div>
    );
  }
}

export default WrestlerDetailHeader;
