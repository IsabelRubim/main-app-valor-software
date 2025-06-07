import ReactDOM from 'react-dom/client';
import React, { Suspense, useState } from 'react';

import Wrapper from './components/main/Wrapper';

import './index.css';

const CartSummary = React.lazy(() => import('cart/CartSummary'));
const CartPage = React.lazy(() => import('cart/CartPage'));
const Products = React.lazy(() => import('products/Products'));

type View = 'products' | 'cartDetails';

const App = () => {
  const [currentView, setCurrentView] = useState<View>('products');

  const navigateToCartDetails = () => setCurrentView('cartDetails');
  const navigateToProducts = () => setCurrentView('products');

  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen text-xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'>
          Loading...
        </div>
      }
    >
      <Wrapper>
        {currentView === 'products' && (
          <>
            <CartSummary onViewCartClick={navigateToCartDetails} />

            <Products />
          </>
        )}

        {currentView === 'cartDetails' && (
          <CartPage onContinueShopping={navigateToProducts} />
        )}
      </Wrapper>
    </Suspense>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(<App />);
