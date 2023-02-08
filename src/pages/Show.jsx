import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/Config';

function Show() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoding] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShow(results);
          setIsLoding(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoding(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  // eslint-disable-next-line no-console
  console.log('show', show);

  if (isLoading) {
    return <div> Data is being loaded</div>;
  }
  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return <div>This is Show page</div>;
}

export default Show;
