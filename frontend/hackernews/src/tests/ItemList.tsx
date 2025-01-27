
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '.././store/store';
import ItemList from '.././components/news/ItemList';

test('renders loading state', () => {
  render(
    <Provider store={store}>
      <ItemList />
    </Provider>
  );
 expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders items', async () => {
  render(
    <Provider store={store}>
      <ItemList />
    </Provider>
  );
  const items = await screen.findAllByRole('heading', { level: 2 });
  expect(items).toHaveLength(20);
});

