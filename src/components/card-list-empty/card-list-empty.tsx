import { PropsWithChildren } from 'react';

type CardListEmptyProps = PropsWithChildren<{
  title: string;
  description: string;
  place?: 'cities' | 'favorites';
}>;

function CardListEmpty ({title, description, place = 'cities', children}: CardListEmptyProps): JSX.Element {
  return (
    <section className={`${place === 'cities' ? 'cities__no-places' : 'favorites favorites--empty'}`}>
      {children}
      <div className={`cities__status-wrapper ${place === 'cities' ? 'tabs__content' : ''}`}>
        <b className="cities__status">{title}</b>
        <p className="cities__status-description">{description}</p>
      </div>
    </section>
  );
}

export default CardListEmpty;
