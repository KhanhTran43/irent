import { useEffect } from 'react';
import styled from 'styled-components';

type RouteDirectionProps = {
  from: string;
  to: string;
};

function initMap(directionsRenderer: any) {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: 16.02298393469663, lng: 108.1880701495974 },
  });

  directionsRenderer.setMap(map);
}

function calculateAndDisplayRoute(directionsRenderer: any, from: string, to: string) {
  const directionsService = new google.maps.DirectionsService();

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
  const directionsRenderer = new google.maps.DirectionsRenderer({});

  useEffect(() => {
    initMap(directionsRenderer);
  }, []);

  useEffect(() => {
    if (!!from && !!to) {
      calculateAndDisplayRoute(directionsRenderer, from, to);
    }
  }, [from, to]);
  return (
    <>
      <MapContainer />
    </>
  );
};

const MapContainer = styled.div.attrs({ id: 'map' })`
  height: 100%;
`;
