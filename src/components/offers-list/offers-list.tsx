import Card from '../card/card';
import {OffersCard} from '../../types/offers';
import {MainClassName} from '../../const';
import {MainClassNamesEnum, FavoriteClassNamesEnum, PropertyClassNameEnum} from '../../types/classNames';

type OffersListProps = {
  listClassName?: MainClassNamesEnum | FavoriteClassNamesEnum | PropertyClassNameEnum;
  offers: OffersCard;
}

function OffersList ({ listClassName = MainClassName, offers}: OffersListProps): JSX.Element {

  return (
    <div className={listClassName?.List}>
      {offers.map((offer) =>
        (
          <Card
            key = {offer.id}
            offer = {offer}
            classNames = {listClassName}
          />
        )
      )}
    </div>
  );
}

export default OffersList;
