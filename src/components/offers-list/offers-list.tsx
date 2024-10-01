import Card from '../card/card';
import {OffersCard} from '../../types/offers';
import {useState} from 'react';
import {CardClassName} from '../../const';

type OffersListProps = {
  offersList: OffersCard;
}

function OffersList ({offersList}: OffersListProps): JSX.Element {

  const [activeOffer, setActiveOffer] = useState<number | null>(null);

  const handleCardMouseMove = (id: number) => {
    setActiveOffer(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOffer(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList.map((offer) => (<Card
        key = {offer.id}
        onMouseMove = {handleCardMouseMove}
        onMouseLeave = {handleCardMouseLeave}
        /*{...offer}*/
        offer = {offer}
        classNames = {CardClassName}
      />))}
    </div>
  );
}

export default OffersList;
