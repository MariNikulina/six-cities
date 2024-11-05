import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppDispatch, useAppSelector} from '../../hooks';
import SortingList from '../../components/sorting-list/sorting-list';
import {SortName} from '../../types/offers';
import { setSorting } from '../../store/site-process/site-process';
import Header from '../../components/header/header';
import { getActiveOffers, getCity, getSorting } from '../../store/site-process/selectors';
import { selectOffers } from '../../store/site-data/selectors';
import CardLiEmpty from '../../components/card-list-empty/card-list-empty';


function MainPageScreen (): JSX.Element {

  // const { city, offers, sorting: activeSorting, activeOffer} = useAppSelector((state) => state);
  const city = useAppSelector(getCity);
  // const offers = useAppSelector(getOffers);
  const activeSorting = useAppSelector(getSorting);
  const activeOffer = useAppSelector(getActiveOffers);
  const offers = useAppSelector(selectOffers);

  // const filteredOffers = filterOffers(city.name, offers);
  // const sortedOffers = filteredOffers.sort(Corparator[activeSorting]);

  const offersCount = offers.length;
  const isEmpty = offersCount === 0;
  const dispatch = useAppDispatch();

  function onSortingChange (sortType: SortName) {
    dispatch(setSorting(sortType));
  }

  const locations = offers.map(({id, location}) => ({id, ...location}));

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <CitiesList />

        <div className="cities">
          <div className={`cities__places-container ${isEmpty ? 'cities__places-container--empty' : ''} container`}>
            {isEmpty ?
              <CardLiEmpty
                title='No places to stay available'
                description={`We could not find any property available at the moment in ${city.name}`}
              /> :
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {city.name}</b>

                <SortingList onChange={onSortingChange} activeSorting={activeSorting}/>

                <OffersList offers={offers}/>

              </section>}
            <div className="cities__right-section">

              {!isEmpty && <Map city={city} locations={locations} activeOffer={activeOffer}/>}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPageScreen;
