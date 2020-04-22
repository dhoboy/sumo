import React, { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setFilterText, setSortType, setSortDirection } from '../../actions/wrestlerList';

const ListFilters = () => {
  const dispatch = useDispatch();
  
  const { filterText, sortType, sortDirection } = useSelector(store => {
    return {
      filterText: store.wrestlerList.filterText,
      sortType: store.wrestlerList.sortType,
      sortDirection: store.wrestlerList.sortDirection,
    };
  }, shallowEqual);
  
  const handleFilterTextChange = useCallback(e => {
    dispatch(setFilterText(e));
  });

  const handleSortDirectionChange = useCallback(e => {
    dispatch(setSortDirection(e));
  });

  const handleSortTypeChange = useCallback(e => {
    dispatch(setSortType(e));
  });

  return (
    <div className="list-filters">
      <label>
        <span className="wrestler-name-filter">Filter by Wrestler Name</span>
        <input type="text" onChange={handleFilterTextChange} value={filterText} />
      </label>
      <div className="sort-options">
        <label>
          <span>Sort By</span>
          <select value={sortType} onChange={handleSortTypeChange}>
            <option value="alphabetical">Alphabetical</option>
            <option value="rank">Rank</option>          
          </select>
        </label>
        <label>
          <span>Sort Direction</span>
          <select value={sortDirection} onChange={handleSortDirectionChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default ListFilters;
