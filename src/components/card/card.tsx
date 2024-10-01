import {Link} from 'react-router-dom';
import {OfferCard} from '../../types/offers';
import {AppRoute} from '../../const';
import {CardClassNamesEnum, FavoriteClassNamesEnum} from '../../types/classNames';
import {FavoritesClassName} from '../../const';

type OfferCardProps = {
  onMouseMove: (id: number) => void;
  onMouseLeave: () => void;
  offer: OfferCard;
  classNames: CardClassNamesEnum | FavoriteClassNamesEnum;
}

function Card ({onMouseMove = () => void 0, onMouseLeave = () => void 0, offer, classNames = FavoritesClassName}: OfferCardProps): JSX.Element {
  const {id, isFavorite, isPremium, previewImage, price, rating, title, type} = offer;
  const ratingStyle = rating * 20;

  const handleMouseMove = () => {
    onMouseMove(id);
  };

  return (
    <article
      className={`${classNames.Article}card place-card`}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
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
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingStyle}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;


