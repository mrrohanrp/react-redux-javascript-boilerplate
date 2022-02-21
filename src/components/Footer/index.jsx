import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Filter } from 'src/utils/Filter';

import style from './style.module.scss';

export const FILTER_TITLES = {
  [Filter.SHOW_ALL]: 'All',
  [Filter.SHOW_ACTIVE]: 'Active',
  [Filter.SHOW_COMPLETED]: 'Completed'
};

const Footer = ({ filter, activeCount, completedCount, onClickFilter, onClickClearCompleted }) => {
  const renderTodoCount = React.useCallback(() => {
    const itemWord = activeCount === 1 ? ' item' : 'items';
    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }, [activeCount]);

  const renderFilterLink = React.useCallback(
    (selectedFilter) => {
      return (
        <a
          className={classNames({ [style.selected]: filter === selectedFilter })}
          style={{ cursor: 'pointer' }}
          onClick={() => onClickFilter(selectedFilter)}
        >
          {FILTER_TITLES[selectedFilter]}
        </a>
      );
    },
    [filter, onClickFilter]
  );

  const renderClearButton = React.useCallback(() => {
    if (completedCount) {
      return (
        <button className={style.clearCompleted} onClick={onClickClearCompleted}>
          {'Clear completed'}
        </button>
      );
    }
  }, [completedCount, onClickClearCompleted]);

  return (
    <footer className={style.normal}>
      {renderTodoCount()}
      <ul className={style.filters}>
        {Object.keys(Filter).map((key) => (
          <li key={key}>{renderFilterLink(Filter[key])}</li>
        ))}
      </ul>
      {renderClearButton()}
    </footer>
  );
};

Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  activeCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  onClickFilter: PropTypes.func.isRequired,
  onClickClearCompleted: PropTypes.func.isRequired
};

export { Footer };
