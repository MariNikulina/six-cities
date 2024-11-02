import {MutableRefObject, useEffect, useState,useRef} from 'react';
import {City} from '../types/offers';
import {Map, TileLayer} from 'leaflet';

function useMap (mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if(mapRef.current !== null && !isRenderedRef.current) {

      const instanse = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instanse.addLayer(layer);

      setMap(instanse);
      isRenderedRef.current = true;
    }

  }, [mapRef, map, city]);

  return map;
}

export default useMap;
