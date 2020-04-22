import React from 'react';
import { useDispatch } from 'react-redux';
import { loadWrestlerListPage } from '../../actions/wrestlerList';

const Header = () => { 
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(loadWrestlerListPage());
  };

  return (
    <div className="header" onClick={handleClick}>
      Grand Sumo
    </div>
  );
}

export default Header;
