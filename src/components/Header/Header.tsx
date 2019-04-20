import React, { Component } from 'react';
import './Header.css';

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
  "fontSize": "35px",
  "margin": "10px 0 20px 0",
  "paddingBottom": "10px",
  "fontWeight": 700,
  "cursor": "pointer",
  "text-align": "center",
  "border-bottom": "2px solid #e40000"
};

export default Header;
