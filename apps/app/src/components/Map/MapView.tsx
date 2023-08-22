import { useEffect } from 'react';

import { MapContainer } from './MapContainer';

async function initMap(lat: number, lng: number) {
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
  const map = new Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 14,
    mapId: '4504f8b37365c3d0',
  });
  const marker = new AdvancedMarkerElement({
    map,
    position: { lat, lng },
  });
}

type MapViewProps = {
  lat: number;
  lng: number;
};

export const MapView = (props: MapViewProps) => {
  const { lat, lng } = props;

  useEffect(() => {
    initMap(lat, lng);
  }, [lat, lng]);

  return <MapContainer />;
};



