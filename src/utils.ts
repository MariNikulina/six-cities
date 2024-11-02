import {AuthorizationStatus, MAX_PERCENT_STARS_WIDTH, STARS_COUNT} from "./const";
import {OfferCard, OffersCard, SortName} from "./types/offers";
import dayjs from 'dayjs'
import {Reviews} from "./types/review";

export const getStarsWidth = (rating: number) => `${MAX_PERCENT_STARS_WIDTH * rating / STARS_COUNT}%`;

export const humanizeDate = (date: string) => dayjs(date).format('MMMM YYYY');

export function filterOffers (city: string, offers: OffersCard) {
  return offers.filter((offer) => offer.city.name === city)
}

export function groupOffersByCities (offers: OffersCard) {
  const groupedOffersByCities = offers.reduce<{ [key: string]: OffersCard }>((prev, el) => {
    if(el.isFavorite) {
      const city = el.city.name;

      if (!(city in prev)) {
        prev[city] = [];
      }

      prev[city].push(el);
    }

    return prev;
  }, {});

  return groupedOffersByCities;
};

export function filterComments (comments: Reviews, id: OfferCard['id']) {
  return comments.filter((comment) => comment.user.id === id);
}

export const Corparator: {
  [key in SortName]: (a: OfferCard, b: OfferCard) => number}
  = {
  Popular: () => 0,
  PriceIncrease: (a, b) => a.price - b.price,
  PriceDecrease: (a, b) => b.price - a.price,
  TopRated: (a, b) => b.rating - a.rating,
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
