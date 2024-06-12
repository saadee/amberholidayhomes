import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// eslint-disable-next-line react/prop-types
export default function TourMapContainer({ center }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
  //   const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    (map) => {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      // setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(() => {
    // setMap(null);
  }, []);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    )
  );
}
