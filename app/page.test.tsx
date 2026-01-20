import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from './page';
import { Provider } from 'react-redux';
import { store } from './store';

describe('Page Component', () => {
  it('renders the value text', () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    const valueText = screen.getByText(/Value:/i);
    expect(valueText).toBeInTheDocument();
  });
  it('renders the increment button', () => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    );
    const button = screen.getByRole('button', { name: /Increment/i });
    expect(button).toBeInTheDocument();
  });
});