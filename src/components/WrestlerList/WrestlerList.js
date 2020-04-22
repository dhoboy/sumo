import React from 'react';
import { connect } from 'react-redux';
import ListFilters from './ListFilters';
import ListContents from './ListContents';

const WrestlerList = (props) => {
  return (
    <div className="wrestler-list">
      <ListFilters />
      <ListContents />
    </div>
  );
};

const mapStateToProps = (store) => {
  return { ...store.wrestler };
};

export default connect(mapStateToProps)(WrestlerList);
