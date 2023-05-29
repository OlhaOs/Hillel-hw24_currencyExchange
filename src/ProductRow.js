import { Link } from 'react-router-dom';
import PriceRow from './PriceRow';
import './ProductRow.css';

function ProductRow({
  id,
  title,
  category,
  price,
  currency,
  currencyExchange,
  addToCart,
}) {
  const handleAddtoCart = item => () => {
    addToCart(item);
  };
  return (
    <tr key={id}>
      <td>{title}</td>
      <td>{category}</td>
      <td>
        <PriceRow
          price={price}
          currency={currency}
          currencyExchange={currencyExchange}
        />
      </td>
      <td>
        <Link to={`details/${id}`}>
          <button className='detailsBtn'>Details</button>
        </Link>
      </td>
      <td>
        <button className='detailsBtn' onClick={handleAddtoCart({ id, price })}>
          Add to cart
        </button>
      </td>
    </tr>
  );
}
export default ProductRow;
