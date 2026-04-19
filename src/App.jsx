import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import { GoodList } from './components/GoodList/GoodsList';
import { SortTypes } from './constants/sortTypes';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [sortBy, setSortBy] = useState(SortTypes.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const updateIsReversed = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortBy(SortTypes.NONE);
    setIsReversed(false);
  };

  const initialGoods = goodsFromServer.map((name, idx) => ({ idx, name }));
  let visibleGoods = [...initialGoods];

  visibleGoods = visibleGoods.sort((good1, good2) => {
    switch (sortBy) {
      case SortTypes.ALPHABETICAL:
        return good1.name.localeCompare(good2.name);
      case SortTypes.LENGTH:
        return good1.name.length - good2.name.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <GoodList
      goods={visibleGoods}
      sortBy={sortBy}
      isReversed={isReversed}
      onSort={setSortBy}
      onReverse={updateIsReversed}
      onReset={reset}
    />
  );
};
