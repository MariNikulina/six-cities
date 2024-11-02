import {cities, Sorting} from "../const";

export type CityName = typeof cities[number];

export type SortName = keyof typeof Sorting;

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  location: Location;
  name: CityName;
};

export type OfferCard = {
  bedrooms: number;
  city: City;
  description: string;
  goods: [string];
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  id: number;
  images: [string];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
}

export type LocationMap = Pick<OfferCard, 'id'> & Location;

export type OffersCard = OfferCard[];

