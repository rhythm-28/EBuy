import react, { useEffect } from 'react';
import { connect } from 'react-redux';
import OrderSummaryProduct from './orderSummaryProduct';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Invoice from './invoice.js';
function OrderSummary(props) {
  const { products } = props;
  useEffect(() => {
    return async () => {
      const res = await axios.post('api/user/orderPlaced');
    };
  }, []);
  return (
    <div>
      <h2 className="mb-5 mt-3" style={{ color: 'white' }}>
        Order Summary
      </h2>
      <Invoice products={products} />
      {/* {products.map((product) => {
        return <OrderSummaryProduct product={product} />;
      })} */}

      <Link to="/">
        <button style={{ marginLeft: '44%', marginBottom: '3%', marginTop:'2%'}}>
          Shop Again
        </button>
      </Link>
    </div>
  );
}
const mapStateToProps = ({ cart }) => {
  return { cart };
};
export default connect(mapStateToProps)(OrderSummary);
