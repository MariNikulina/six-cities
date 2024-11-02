import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from "../../components/cities-list/cities-list";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Corparator, filterOffers} from "../../utils";
import SortingList from "../../components/sorting-list/sorting-list";
import {SortName} from "../../types/offers";
import { setSorting } from '../../store/site-process/site-process';
import Header from "../../components/header/header";
import { getActiveOffers, getCity, getSorting } from '../../store/site-process/selectors';
import { getOffers } from '../../store/site-data/selectors';


function MainPageScreen (): JSX.Element {

  // const { city, offers, sorting: activeSorting, activeOffer} = useAppSelector((state) => state);
  const city = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const activeSorting = useAppSelector(getSorting);
  const activeOffer = useAppSelector(getActiveOffers);
  
  const filteredOffers = filterOffers(city.name, offers);
  const sortedOffers = filteredOffers.sort(Corparator[activeSorting]);

  const offersCount = sortedOffers.length;
  const dispatch = useAppDispatch();

  function onSortingChange (sortType: SortName) {
    dispatch(setSorting(sortType));
  }

  const locations = filteredOffers.map(({id, location}) => ({id, ... location}))

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <CitiesList />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {city.name}</b>

              <SortingList onChange={onSortingChange} activeSorting={activeSorting}/>

              <OffersList offers={sortedOffers}/>

            </section>
            <div className="cities__right-section">

              <Map city={city} locations={locations} activeOffer={activeOffer}/>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPageScreen;
