import {Sorting} from '../../const';
import {useState} from 'react';
import {SortName} from '../../types/offers';


type SortingListProps = {
  onChange: (sortType: SortName) => void;
  activeSorting: SortName;
}

function SortingList ({ onChange, activeSorting }: SortingListProps): JSX.Element {

  const [isOpened, SetIsOpened] = useState<boolean>(false);

  function handleToggleButtonClick () {
    SetIsOpened(!isOpened);
  }

  function handleSortItemClick (sortType: SortName) {
    SetIsOpened(false);
    onChange(sortType);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggleButtonClick}>
        {Sorting[activeSorting]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpened &&
      (
        <ul className="places__options places__options--custom places__options--opened">
          {(Object.entries(Sorting) as [SortName, string][]).map(([sortType, text]) => (
            <li
              key={sortType}
              className={`places__option ${activeSorting === sortType ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleSortItemClick(sortType)}
            >{text}
            </li>
          ))}
        </ul>
      )}
    </form>

  );
}

export default SortingList;
