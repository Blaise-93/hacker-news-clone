
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '.././store/store';
import UpdateItem from './../components/news/ItemUpdate';

test('renders update item form', () => {
  render(
    <Provider store={store}>
      <UpdateItem id={1} />
    </Provider>
  );
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Text/i)).toBeInTheDocument();
});

test('updates an item', () => {
  render(
    <Provider store={store}>
      <UpdateItem id={1} />
    </Provider>
  );
  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Updated Title' } });
  fireEvent.change(screen.getByPlaceholderText(/Text/i), { target: { value: 'Updated Text' } });
  fireEvent.click(screen.getByText(/Update/i));
  expect(screen.getByPlaceholderText(/Title/i)).toHaveValue('Updated Title');
  expect(screen.getByPlaceholderText(/Text/i)).toHaveValue('Updated Text');
});
