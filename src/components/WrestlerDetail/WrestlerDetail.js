import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';

const WrestlerDetail = (props) => {
  const dispatch = useDispatch();
  
  const wrestlerName = props.match.params.name.toUpperCase();

  const { wrestlers, loading } = useSelector(store => {
    return {
      loading: store.data.loading,
      wrestlers: store.data.wrestlers,
    };
  }, shallowEqual);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className={`wrestler-detail-page ${wrestlerName}`}>
      <DetailHeader wrestlerName={wrestlerName} />
      <DetailBody wrestlerName={wrestlerName} />
    </div>
  );
};

export default WrestlerDetail;
