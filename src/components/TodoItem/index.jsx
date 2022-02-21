import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { COMPLETETODO, DELETETODO, EDITTODO } from 'src/store/todoSlice';
import { TodoTextInput } from '../TodoTextInput';

import style from './style.module.scss';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = React.useCallback(() => {
    setEditing(true);
  }, [setEditing]);

  const handleSave = React.useCallback(
    (id, text) => {
      if (text.length === 0) {
        dispatch(DELETETODO(id));
      } else {
        dispatch(EDITTODO({ id, text }));
      }
      setEditing(false);
    },
    [setEditing, dispatch]
  );

  const classes = classNames({
    [style.completed]: todo.completed,
    [style.editing]: editing,
    [style.normal]: !editing
  });

  return (
    <li className={classes}>
      {editing ? (
        <TodoTextInput onSave={(text) => todo.id && handleSave(todo.id, text)} />
      ) : (
        <div className={style.view}>
          <input
            type="checkbox"
            className={style.toggle}
            checked={todo.completed}
            onChange={() => todo.id && dispatch(COMPLETETODO(todo.id))}
          />
          <label onDoubleClick={() => handleDoubleClick()}>{todo.text}</label>
          <button
            className={style.destroy}
            onClick={() => {
              if (todo.id) dispatch(DELETETODO(todo.id));
            }}
          />
        </div>
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    completed: PropTypes.bool
  }).isRequired
};

export { TodoItem };
