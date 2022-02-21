import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.scss';

const TodoTextInput = ({ placeholder, newTodo, onSave }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = React.useCallback(
    (event) => {
      const text = event.currentTarget.value.trim();
      if (event.which === 13) {
        onSave(text);
        setInputText('');
      }
    },
    [onSave, setInputText]
  );

  const handleChange = React.useCallback(
    (event) => {
      setInputText(event.target.value);
    },
    [setInputText]
  );

  const handleBlur = React.useCallback(
    (event) => {
      const text = event.currentTarget.value.trim();
      if (!newTodo) {
        onSave(text);
      }
    },
    [onSave, newTodo]
  );

  const classes = classNames(
    {
      [style.edit]: !newTodo,
      [style.new]: newTodo
    },
    style.normal
  );

  return (
    <input
      className={classes}
      type="text"
      autoFocus
      placeholder={placeholder}
      value={inputText}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleSubmit}
    />
  );
};

TodoTextInput.propTypes = {
  newTodo: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export { TodoTextInput };
