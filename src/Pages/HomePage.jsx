import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CLEARCOMPLETED } from 'src/store/todoSlice';
import { Filter } from 'src/utils/Filter';
import { Header, TodoList, Footer } from 'src/components';

import style from './HomePage.module.scss';

const FILTER_VALUES = Object.keys(Filter).map((key) => Filter[key]);

const FILTER_FUNCTIONS = {
  [Filter.SHOW_ALL]: () => true,
  [Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [Filter.SHOW_COMPLETED]: (todo) => todo.completed
};

const App = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { todos, filter } = useSelector((state) => {
    const hash = location?.hash?.replace('#', '');
    return {
      todos: state.todos,
      filter: FILTER_VALUES.find((value) => value === hash) ?? Filter.SHOW_ALL
    };
  });

  const handleClearCompleted = React.useCallback(() => {
    dispatch(CLEARCOMPLETED());
  }, [dispatch]);

  const handleFilterChange = React.useCallback(
    (filter) => {
      navigate(`#${filter}`);
    },
    [navigate]
  );

  const filteredTodos = React.useMemo(() => (filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos), [todos, filter]);
  const activeCount = React.useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
  const completedCount = React.useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  return (
    <div className={style.normal}>
      <Header />
      <TodoList todos={filteredTodos} />
      <Footer
        filter={filter}
        activeCount={activeCount}
        completedCount={completedCount}
        onClickClearCompleted={handleClearCompleted}
        onClickFilter={handleFilterChange}
      />
    </div>
  );
};

export default App;
