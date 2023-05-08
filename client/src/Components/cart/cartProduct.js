import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../stylesheets/cart.css';

class CartProduct extends React.Component {
  render() {
    const {
      product,
      addProductToCart,
      subtractProductFromCart,
      removeProductFromCart,
    } = this.props;
    return (
      <div>
        <div class="row productDiv card-all justify-content-center mx-3">
          <div class="col-lg-3 col-md-8 col-10">
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="img-div d-flex justify-content-center pb-3 pt-3">
                <img
                  src={product.image}
                  alt={product.name}
                  class="cart-img img-thumbnail"
                />
              </div>
            </Link>
          </div>

          <div className="col-xl-6 col-lg-5 col-md-7 pt-5">
            <div class="main-info">
              <h3>{product.name}</h3>
              <h2>Final Price: {product.price}</h2>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-5 d-flex justify-content-center pt-5">
            <div class="quantity mx-auto">
              <h2> Quantity: {product.quantity}</h2>
              <Button onClick={() => addProductToCart(product.id)}>
                {' '}
                <AddCircleIcon size="medium" />{' '}
              </Button>
              <Button onClick={() => subtractProductFromCart(product.id)}>
                {' '}
                <RemoveCircleIcon size="medium" />{' '}
              </Button>
              <Button
                size="large"
                onClick={() => removeProductFromCart(product.id)}
              >
                {' '}
                <DeleteIcon />{' '}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ cart }) => {
  return { cart };
};
export default connect(mapStateToProps)(CartProduct);
