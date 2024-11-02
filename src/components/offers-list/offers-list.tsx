import Card from '../card/card';
import {OffersCard} from '../../types/offers';
import {MainClassName} from '../../const';
import {MainClassNamesEnum, FavoriteClassNamesEnum, PropertyClassNameEnum} from "../../types/classNames";

type OffersListProps = {
  listClassName?: MainClassNamesEnum | FavoriteClassNamesEnum | PropertyClassNameEnum;
  offers: OffersCard;
}

function OffersList ({ listClassName = MainClassName, offers}: OffersListProps): JSX.Element {

  // const { sorting: activeSorting } = useAppSelector((state) => state);

  // const [activeOffer, setActiveOffer] = useState<number | null>(null);

  // const handleCardMouseMove = (id: number) => {
  //   setActiveOffer(id);
  // };
  //
  // const handleCardMouseLeave = () => {
  //   setActiveOffer(null);
  // };

  return (
    <div className={listClassName?.List}>
      {offers.map((offer) => (<Card
        key = {offer.id}
        // onMouseMove = {handleCardMouseMove}
        // onMouseLeave = {handleCardMouseLeave}
        offer = {offer}
        classNames = {listClassName}
      />))}
    </div>
  );
}

export default OffersList;
