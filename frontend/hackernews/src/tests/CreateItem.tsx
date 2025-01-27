
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '.././store/store';
import CreateItem from './../components/news/ItemCreate';

test('renders create item form', () => {
  render(
    <Provider store={store}>
      <CreateItem />
    </Provider>
  );
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Text/i)).toBeInTheDocument();
});

test('creates a new item', () => {
  render(
    <Provider store={store}>
      <CreateItem />
    </Provider>
  );
  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Test Title' } });
  fireEvent.change(screen.getByPlaceholderText(/Text/i), { target: { value: 'Test Text' } });
  fireEvent.click(screen.getByText(/Create/i));
  expect(screen.getByPlaceholderText(/Title/i)).toHaveValue('');
  expect(screen.getByPlaceholderText(/Text/i)).toHaveValue('');
});
