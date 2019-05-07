import React, { Component } from 'react';
import './Header.css';

interface Props {
  goToWrestlerList: () => void
}

const Header: React.FunctionComponent<Props> = ({
  goToWrestlerList
}) => {
  return (
    <div 
      onClick={goToWrestlerList} 
      style={headerStyle}
    >
      Grand Sumo
    </div>
  );
}

const headerStyle = {
  "fontSize": "35px",
  "margin": "10px 0 20px 0",
  "paddingBottom": "10px",
  "fontWeight": 700,
  "cursor": "pointer",
  "text-align": "center",
  "borderBottom": "2px solid #e40000"
};

export default Header;
