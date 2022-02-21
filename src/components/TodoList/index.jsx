import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { COMPLETEALL } from 'src/store/todoSlice';
import { TodoItem } from '../TodoItem';

import style from './style.module.scss';

const TodoList = ({ todos }) => {
  const dispatch = useDispatch();
  const hasIncompleted = React.useMemo(() => todos.some((todo) => !todo.completed), [todos]);
  return (
    <section className={style.main}>
      {hasIncompleted && (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={hasIncompleted}
          onChange={() => dispatch(COMPLETEALL())}
        />
      )}
      <ul className={style.normal}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      completed: PropTypes.bool
    })
  ).isRequired
};

export { TodoList };
