import React, { useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { sortWrestlers } from '../../utils/WrestlerListSorts';
import ListContentItem from './ListContentItem';

const ListContents = () => {
  const { 
    filterText, 
    sortType, 
    sortDirection,
    wrestlers,
    data_loading,
  } = useSelector(store => {
    return {
      wrestlers: store.data.wrestlers,
      data_loading: store.data.loading,
      filterText: store.wrestlerList.filterText,
      sortType: store.wrestlerList.sortType,
      sortDirection: store.wrestlerList.sortDirection,
    };
  }, shallowEqual);

  if (data_loading) {
    return <p>Loading...</p>;
  }

  const wrestlerList = sortWrestlers(wrestlers, sortDirection, sortType).filter(wrestler => {
    return wrestler.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
  });

  if (wrestlerList.length === 0) {
    return <p className="empty-list-contents">No Wrestlers Match Your Search Term!</p>;
  }

  return (
    <div className="list-contents">
      {wrestlerList.map(wrestler => {
        // dealing with race conditions... will deal with later, good enough for now
        if (wrestler.tournament) {
          return <ListContentItem {...wrestler} />;
        }
      })}
    </div>
  );
};

export default ListContents;
