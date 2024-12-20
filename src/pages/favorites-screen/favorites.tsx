import {FavoritesClassName} from '../../const';
import OffersList from '../../components/offers-list/offers-list';
import {useAppSelector} from '../../hooks';
import {groupOffersByCities} from '../../utils';
import Header from '../../components/header/header';
import { getFavoriteOffers, getFavoriteOffersLoadingStatus, getOffers } from '../../store/site-data/selectors';
import CardLiEmpty from '../../components/card-list-empty/card-list-empty';
import Logo from '../../components/logo/logo';
import LoadingScreen from '../loading-screen/loading-screen';

function FavoritesScreen (): JSX.Element {

  // const {offers} = useAppSelector((state) => state);
  const offers = useAppSelector(getOffers);
  const isEmpty = useAppSelector(getFavoriteOffers).length === 0;
  const isFavoriteOffersLoading = useAppSelector(getFavoriteOffersLoadingStatus);

  if (isFavoriteOffersLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`page ${isEmpty ? 'page--favorites-empty' : ''}`}>

      <Header />

      <main className={`page__main page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isEmpty ?
            <CardLiEmpty
              title='Nothing yet saved.'
              description='Save properties to narrow down search or plan your future trips.'
              place='favorites'
            >
              <h1 className="visually-hidden">Favorites (empty)</h1>
            </CardLiEmpty> :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">

                {Object.entries(groupOffersByCities(offers)).map(([city, offersList]) =>
                  (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>

                      <OffersList listClassName={FavoritesClassName} offers={offersList} />

                    </li>
                  )
                )}

              </ul>
            </section>}
        </div>
      </main>
      <footer className="footer container">

        <Logo place='footer' />

      </footer>
    </div>
  );
}

export default FavoritesScreen;
