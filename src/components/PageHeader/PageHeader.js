import React from 'react';
import { NavLink } from "react-router-dom";

const PageHeader = () => { 
  return (
    <div className="page-header">
      <span className="logo">Grand Sumo</span>
      <div className="nav-links">
        <NavLink to={'/overview'}>
          <span>Overview</span>
        </NavLink>        
        <NavLink to={'/wrestler-list'}>
          <span>Wrestlers</span>
        </NavLink>
        <NavLink to={'/tournaments'}>
          <span>Tournaments</span>
        </NavLink>
        <NavLink to="/insights">
          <span>Insights</span>
        </NavLink>
      </div>
    </div>
  );
}

export default PageHeader;
