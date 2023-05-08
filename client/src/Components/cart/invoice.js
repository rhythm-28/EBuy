import react from 'react';
import styles from '../../stylesheets/cart.css';

function Item(props) {
  const { product } = props;
  console.log('props item', props);
  console.log('inside item', product);
  return (
    <div className="row invoice-item">
      <div className="col-4">{product.quantity}</div>
      <div className="col-4">{product.name}</div>
      <div className="col-4" style={{ textAlign: 'right' }}>
        {' '}
        ₹ {product.price} /-
      </div>
    </div>
  );
}

function Invoice(props) {
  const { products } = props;
  const totalPrice = () => {
    let price = 76;
    products.forEach((product) => {
      price += product.quantity * product.price;
    });
    return price;
  };
  return (
    <div className="invoice">
      <div className="row invoice-head">
        <div className="col-4">Qty</div>
        <div className="col-4">Product</div>
        <div className="col-4" style={{ textAlign: 'right' }}>
          Price
        </div>
      </div>
      <br />
      {products.map((product) => {
        return <Item product={product} />;
      })}
      <hr />
      <div className="invoice-charges">
        <div>Subtotal</div>
        <div>₹ {totalPrice() - 76} /-</div>
      </div>
      <div className="invoice-charges">
        <div>Delivery Charges</div>
        <div>₹ 50 /-</div>
      </div>
      <div className="invoice-charges">
        <div>Tax</div>
        <div>₹ 26 /-</div>
      </div>
      <hr />
      <div className="invoice-charges invoice-foot">
        <div>Total</div>
        <div>₹ {totalPrice()} /-</div>
        {/* <div >₹ {product.price+76} /-</div> */}
      </div>
    </div>
  );
}

export default Invoice;
