import React, { Component } from 'react';
//import '../styles/Header.css';

interface Props {
  goToWrestlerList: () => void
}

class Header extends Component<Props, object> {
  render() {
    return (
      <div 
        onClick={this.props.goToWrestlerList} 
        style={headerStyle}
      >
        Grand Sumo
      </div>
    );
  }
}

const headerStyle = {
  "fontSize": "24px",
  "margin": "10px 0",
  "fontWeight": 700,
  "cursor": "pointer"
};

export default Header;
