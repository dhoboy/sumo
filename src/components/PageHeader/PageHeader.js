import React from 'react';
import { useDispatch } from 'react-redux';
import { loadWrestlerListPage } from '../../actions/wrestlerList';

const PageHeader = () => { 
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loadWrestlerListPage());
  };

  return (
    <div className="page-header" onClick={handleClick}>
      Grand Sumo
    </div>
  );
}

export default PageHeader;
