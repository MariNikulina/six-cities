import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from '../../components/form/form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import {OfferCard} from '../../types/offers';
import {PropertyClassName, TypeHousing, AuthorizationStatus} from '../../const';
import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getStarsWidth} from '../../utils';
import {leaveComment} from '../../store/api-actions';
import {NewReview} from '../../types/review';
import { getComments, getCommentsLoadingStatus, getDetailedOffers, getDetailedOffersLoadingStatus, getOffersNearby, getOffersNearbyLoadingStatus } from '../../store/site-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getCity } from '../../store/site-process/selectors';
import Bookmark from '../../components/bookmark/bookmark';
import { fetchDetailedInfoAction, fetchOffersNearbyAction, fetchComments } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';

function PropertyScreen (): JSX.Element | null {

  const params = useParams();
  const detailedOffer = useAppSelector(getDetailedOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offersNearby = useAppSelector(getOffersNearby);
  const comments = useAppSelector(getComments);
  const city = useAppSelector(getCity);
  const isDetailedOffersLoading = useAppSelector(getDetailedOffersLoadingStatus);
  const isCommentsLoading = useAppSelector(getCommentsLoadingStatus);
  const isOffersNearbyLoading = useAppSelector(getOffersNearbyLoadingStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const { id } = params;
    if (id) {
      const parsedId = Number(id);
      dispatch(fetchDetailedInfoAction(parsedId));
      dispatch(fetchOffersNearbyAction(parsedId));
      dispatch(fetchComments(parsedId));
    }
  }, [params, dispatch]);

  if (isDetailedOffersLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (!detailedOffer) {
    return null;
  }

  const {
    images,
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    id,
    location,
    isFavorite,
  } = detailedOffer;

  const locations = offersNearby.map(({id: nearbyId, location: nearbyLocation, }) => ({ id: nearbyId, ...nearbyLocation }));
  locations.push({id, ...location});

  function onFormSubmit (formData: NewReview) {
    dispatch(leaveComment({id, ...formData}));
  }

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {(images.slice(0, 6) as OfferCard['images']).map((image) => (
                <div
                  className="property__image-wrapper"
                  key={image}
                >
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))}

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>

                <Bookmark id={id} isActive={isFavorite} place='property'/>

              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getStarsWidth(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {TypeHousing[type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                    ${bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                    Max ${maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;${price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">

                  {(goods as OfferCard['goods']).map((item) => (
                    <li
                      className="property__inside-item"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}

                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74"
                      height="74" alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>

                {isCommentsLoading ?
                  <LoadingScreen /> :
                  <ReviewsList reviews={comments}/>}

                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Form onSubmit={onFormSubmit}/>}

              </section>
            </div>
          </div>

          <Map city={city} locations={locations} activeOffer={id} place='property' />

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            {isOffersNearbyLoading ?
              <LoadingScreen /> :
              <OffersList listClassName={PropertyClassName} offers={offersNearby} />}

          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyScreen;
