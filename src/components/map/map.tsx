import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import {City, LocationMap} from '../../types/offers';
import useMap from '../../hooks/use-map';
import {Icon, Marker} from 'leaflet';
import {CityLocation} from '../../const';

type MapProps = {
  city: City;
  locations: LocationMap[];
  activeOffer: number | null;
  place?: 'cities' | 'property';
};

function Map({ place = 'cities', city, locations, activeOffer}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = new Icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = new Icon({
    iconUrl: './img/pin-active.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    const markers: Marker[] = [];
    if (map) {
      locations.forEach((offer) => {
        const marker = new Marker({
          lat: offer.latitude,
          lng: offer.longitude,
        });

        marker
          .setIcon(offer.id === activeOffer ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);

        markers.push(marker);
      });

      const {latitude: lat, longitude: lng, zoom } = CityLocation[city.name];

      map.setView({lat, lng}, zoom);
    }

    return () => {
      if (map) {
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map, locations, city, activeOffer]);

  return (
    <section
      className={`${place}__map map`}
      ref={mapRef}
    />
  );
}

export default Map;
