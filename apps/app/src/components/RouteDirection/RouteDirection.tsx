import { useEffect, useState } from 'react';
import styled from 'styled-components';

type RouteDirectionProps = {
  from: string;
  to: string;
};

const directionsRenderer = new google.maps.DirectionsRenderer({});
const directionsService = new google.maps.DirectionsService();

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: 16.02298393469663, lng: 108.1880701495974 },
  });

  directionsRenderer.setMap(map);
}

function calculateAndDisplayRoute(from: string, to: string) {
  directionsService
    .route({
      origin: {
        query: from,
      },
      destination: {
        query: to,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response: any) => {
      directionsRenderer.setDirections(response);
    })
    .catch(() => window.alert('Can not load the direction'));
}

export const RouteDirection = (props: RouteDirectionProps) => {
  const { from, to } = props;

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (!!from && !!to) {
      calculateAndDisplayRoute(from, to);

      initMap();
    }
  }, [from, to]);
  return (
    <>
      <MapContainer />
    </>
  );
};

const MapContainer = styled.div.attrs({ id: 'map' })`
  height: 550px;
  width: 100%;
`;
