import currencyFormatter from 'currency-formatter';
function PriceRow({ price, currency, currencyExchange }) {
  return (
    <>
      {currencyFormatter.format(price * currencyExchange, { code: currency })}
    </>
  );
}

export default PriceRow;
