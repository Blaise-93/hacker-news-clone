import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '.././store/store';
import ItemDelete from '../components/news/ItemDelete';

test('renders delete item button', () => {
  render(
    <Provider store={store}>
      <ItemDelete/>
    </Provider>
  );
  expect(screen.getByText(/Delete/i)).toBeInTheDocument();
});

test('deletes an item', () => {
  render(
    <Provider store={store}>
      <ItemDelete/>
    </Provider>
  );
  fireEvent.click(screen.getByText(/Delete/i));
  expect(screen.queryByText(/Delete/i)).not.toBeInTheDocument();
});
