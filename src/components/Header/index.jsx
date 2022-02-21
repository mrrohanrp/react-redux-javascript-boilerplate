import React from 'react';
import { useDispatch } from 'react-redux';

import { ADDTODO } from 'src/store/todoSlice';
import { TodoTextInput } from '../TodoTextInput';

export const Header = () => {
  const dispatch = useDispatch();

  const handleSave = React.useCallback(
    (text) => {
      if (text.length) dispatch(ADDTODO({ text: text }));
    },
    [dispatch]
  );

  return (
    <header>
      <h1>Todos</h1>
      <TodoTextInput newTodo onSave={handleSave} placeholder="What needs to be done?" />
    </header>
  );
};
