import { useCallback } from 'react';
import {cities} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { setCity } from '../../store/site-process/site-process';
import City from '../city/city';
import {CityName} from '../../types/offers';
import { getCity } from '../../store/site-process/selectors';

function CitiesList (): JSX.Element {
  
  const city = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  const handleClick = useCallback((name: CityName) => {
    dispatch(setCity(name));
  }, [dispatch]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((name) => (
            <City
              key={name}
              name={name}
              active={name === city.name}
              onClick={handleClick}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
