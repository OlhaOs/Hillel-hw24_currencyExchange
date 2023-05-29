import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import ProductRow from './ProductRow';

function App({ currency: globalCurrency }) {
  const [listOfProducts, setListOfTypeProducts] = useState([]);
  const [categoryValue, setCategoryValue] = useState("women's clothing");
  const [listOfCategories, setOfCategories] = useState([]);
  const [currency, setCurrency] = useState(globalCurrency);
  const [currencyExchange, setcurrencyExchange] = useState('1');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => {
        setOfCategories(json);
      });

    fetch('https://fakestoreapi.com/products')
      .then(value => value.json())
      .then(value => {
        setListOfTypeProducts(value);
      });
  }, []);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/' + categoryValue)
      .then(res => res.json())
      .then(json => {
        setListOfTypeProducts(json);
      });
  }, [categoryValue]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'fOtUclx3Z0YV3Md36NW0CwpgtxwCwWGj');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    fetch(
      `https://api.apilayer.com/fixer/latest?symbols=${currency}&base=USD`,
      requestOptions
    )
      .then(resp => resp.json())
      .then(data => {
        const currencyValue = Object.values(data.rates)[0];
        setcurrencyExchange(currencyValue);
      })
      .catch(error => console.log('error', error));
  }, [currency]);

  const addToCart = item => {
    setCart([...cart, item]);

    console.log(cart);
  };

  const totalCost = cart.reduce((acc, current) => {
    return acc + current.price;
  }, 0);

  return (
    <div className='app'>
      <div>Total amount: {cart.length}</div>
      <div>Total cost: {totalCost}</div>
      <form className='form'>
        <select
          value={categoryValue}
          onChange={event => {
            setCategoryValue(event.target.value);
          }}
        >
          <option value='allProducts'>Products</option>
          {listOfCategories.map(category => (
            <option
              defaultValue={category === categoryValue}
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
        <input type='text' placeholder='max price' />

        <select value={currency} onChange={e => setCurrency(e.target.value)}>
          <option defaultValue={currency} value='USD'>
            USD
          </option>
          <option value='EUR'>EUR</option>
          <option value='UAH'>UAH</option>
        </select>
      </form>
      <table>
        <tbody>
          {listOfProducts.map(({ title, category, price, id }) => {
            return (
              <ProductRow
                title={title}
                category={category}
                price={price}
                id={id}
                currency={currency}
                key={id}
                currencyExchange={currencyExchange}
                addToCart={addToCart}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
