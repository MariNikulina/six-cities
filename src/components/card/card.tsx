import {OfferCard} from '../../types/offers';
import {MainClassNamesEnum, FavoriteClassNamesEnum, PropertyClassNameEnum} from '../../types/classNames';
import {FavoritesClassName} from '../../const';
import {useAppDispatch} from '../../hooks';
import { setActiveOffer } from '../../store/site-process/site-process';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../const';
import {getStarsWidth} from '../../utils';
import Bookmark from '../bookmark/bookmark';

type OfferCardProps = {
  offer: OfferCard;
  classNames: MainClassNamesEnum | FavoriteClassNamesEnum | PropertyClassNameEnum;
}

function Card ({ offer, classNames = FavoritesClassName}: OfferCardProps): JSX.Element {
  const {id, isFavorite, isPremium, previewImage, price, rating, title, type} = offer;


  const dispatch = useAppDispatch();

  const handleMouseMove = () => {
    dispatch(setActiveOffer(id));
  };

  const handleMouseLeave = () => {
    dispatch(setActiveOffer(null));
  };

  const handleTitleClick = () => {
    dispatch(redirectToRoute(`${AppRoute.Room}/${id}`));
  };


  return (
    <article
      className={`${classNames.Article}card place-card`}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${classNames.Wrapper}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200"
            alt={title}
          />
        </a>
      </div>
      <div className={`${classNames.Info} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <Bookmark id={id} isActive={isFavorite} />

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getStarsWidth(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={handleTitleClick}>
          <a>{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;


