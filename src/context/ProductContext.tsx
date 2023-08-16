import {createContext, useEffect, useContext, useReducer} from 'react';

const ProductsContext = createContext(null);

const initialState = {
  products: [],
  isLoading: false,
  myProducts: [],
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'loading':
      return {...state, isLoading: true};

    case 'products/loaded':
      console.log('products loaded');
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case 'products/add':
      console.log('produc tadd', action.payload, state);
      return {
        ...state,
        myProducts: [...state.myProducts, action.payload],
      };
    default:
      throw new Error('Unknown action type');
  }
}

function ProductsProvider({children}: any) {
  const [{products, isLoading, myProducts}, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function fetchProducts() {
      dispatch({type: 'loading'});

      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        dispatch({type: 'products/loaded', payload: data});
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading cities...',
        });
      }
    }
    fetchProducts();
  }, []);

  const addProduct = product => {
    console.log('product', product);
    dispatch({type: 'products/add', payload: product});
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        myProducts,
      }}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context: any = useContext(ProductsContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export {ProductsProvider, useProducts};
