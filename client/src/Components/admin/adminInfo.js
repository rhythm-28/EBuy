import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import LoopTwoToneIcon from '@material-ui/icons/LoopTwoTone';
import { productDelete } from '../../actions/product';
import { Flash } from '../';
import Navbar from '../navbar';
import ProductInfo from './productInfo.js';
import StoreDetails from './storeDetails.js';
import Styles from '../../stylesheets/adminInfoStyles.css';

class adminInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      admin: null,
      products: null,
    };
  }
  handleDelete = async (id) => {
    const products = await axios.get(`/api/product/${id}/delete`);
    this.setState({ products: products.data });
    this.props.dispatch(productDelete());
  };
  componentDidMount = async () => {
    const admin = await axios.get('/api/currentAdmin');
    const products = await axios.get('/api/admin/products');
    this.setState({ admin: admin.data, products: products.data });
  };

  render() {
    const { admin, products } = this.state;

    if (!admin) {
      return (
        <div className="d-flex justify-content-center align-items-center loadingPage">
          <div style={{ width: 150, height: 150 }}>
            <div className="loading"> </div>
          </div>
        </div>
      );
    }

    function renderProducts(products, handleDelete) {
      if (products.length === 0)
        return (
          <div className="no-product">
            <h1> You Have No Products!</h1>
            <Link to="/add/product" class="nav-link">
              Add Your First Product
            </Link>
          </div>
        );
      else
        return products.map((product) => {
          return <ProductInfo product={product} handleDelete={handleDelete} />;
        });
    }

    return (
      <div>
        <Navbar />
        <Flash />
        <div className="admin-div">
          <div className="store-name">
            <h1 className="store-name-h1"> {admin.storeName} </h1>
          </div>

          <div className="details-products">
            <div className="row">
              <StoreDetails details={admin} />
              {products && (
                <div className="store-products col-lg-7">
                  <h1 className="col-12 your-products-heading">
                    {' '}
                    Your Products{' '}
                  </h1>
                  <div className="row store-product-div">
                    {renderProducts(products, this.handleDelete)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authAdmin }) => {
  return { authAdmin };
};
export default connect(mapStateToProps)(adminInfo);
