import { useAppDispatch } from '../../hooks';
import { OfferCard } from '../../types/offers';
import { changeStatusFavoriteOffer } from '../../store/api-actions';

type BookmarkProps = {
    id: OfferCard['id'];
    isActive: OfferCard['isFavorite'];
    place?: 'place-card' | 'property';
}

function Bookmark ({id, isActive, place = 'place-card'}: BookmarkProps): JSX.Element {

  const dispatch = useAppDispatch();
  const status = isActive ? 0 : 1;

  const handleFavoriteButtonClick = () => {
    dispatch(changeStatusFavoriteOffer({
      id,
      status,
    }));
  };

  return (
    <button
      className={`${place}__bookmark-button ${isActive ? `${place}__bookmark-button--active` : ''} button`}
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg className="place-card__bookmark-icon" width={place === 'property' ? 31 : 18} height={place === 'property' ? 33 : 19}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isActive ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}

export default Bookmark;
