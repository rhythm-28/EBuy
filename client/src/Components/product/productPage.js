import React from 'react';
import axios from 'axios';

import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { Avatar, Button } from '@material-ui/core/';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userAddedProduct } from '../../actions/cart';
import { Navbar, Carousel, Flash, Product } from '../';

import Styles from '../../stylesheets/productPage.css';

class productPage extends React.Component {
  constructor() {
    super();
    this.state = {
      product: null,
      added: false,
      modalText: 'Copy Link',
      recommendedProducts: null,
    };
  }
  componentDidMount = async () => {
    const { match } = this.props;
    const res = await axios.get(`/api/product/${match.params.productId}`);
    const result = await axios.get(`/api/products/${res.data.category}`);
    this.setState({
      product: res.data,
      recommendedProducts: result.data,
    });
  };
  fetchData = async (productId) => {
    const res = await axios.get(`/api/product/${productId}`);
    this.setState({
      product: res.data,
    });
  };
  handleClick = async () => {
    const { match } = this.props;
    this.props.dispatch(userAddedProduct(this.state.product._id));
    this.setState({ added: true });
  };
  myFunction = async () => {
    const copyText = document.getElementsByClassName('referral-input')[0];
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    console.log('Modal text', this.state.modalText);
    if (this.state.modalText !== 'Copied') {
      await axios.post('/api/walletBalance');
    }
    console.log('Modal text 2', this.state.modalText);
    this.setState({ modalText: 'Copied' });
  };
  render() {
    const { product, added, recommendedProducts } = this.state;
    const { isLoggedIn } = this.props.authUser;
    const { fetchData } = this;
    if (!product) {
      return (
        <div className="d-flex justify-content-center align-items-center loadingPage">
          <div style={{ width: 150, height: 150 }}>
            <div className="loading"> </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <Flash />
        <div className="row mainDiv justify-content-center">
          <div className="col-xl-4  col-md-7 col-sm-9 col-10 leftDivStyle mt-5 mb-0 py-0">
            <div className="card card-all carousel-card">
              <div className="card-body" id="carouselProductPage">
                <Carousel images={product.images} />
                {isLoggedIn && (
                  <div className="buttons">
                    <button
                      onClick={this.handleClick}
                      disabled={added}
                      className={added ? `btn-success` : ''}
                    >
                      <i class="fas fa-shopping-cart"></i>{' '}
                      {added ? 'Added' : 'Add to Cart'}
                    </button>
                    <Link to="/user/cart" style={{ textDecoration: 'none' }}>
                      <button onClick={this.handleClick}>
                        {' '}
                        <i class="fas fa-shopping-cart"> </i> Buy Now
                      </button>
                    </Link>
                  </div>
                )}
                {!isLoggedIn && (
                  <Link to="/user/auth" style={{ textDecoration: 'none' }}>
                    <div className="buttons">
                      <button>Login to buy</button>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-7  rightDivStyle mt-0 mb-5 mt-xl-5">
            <div class="main-info mx-3">
              <div class="card card-all text-white card-title">
                <div class="card-body">
                  <div className="intro">
                    <div className="d-flex justify-content-between">
                      <h2> {product.name}</h2>
                      {isLoggedIn && (
                        <div style={{ width: 50 }}>
                          <i
                            type="button"
                            class="btn btn-primary btn-icon"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            className="icon fas fa-share-alt"
                            style={{ marginLeft: 20 }}
                          ></i>
                        </div>
                      )}
                    </div>

                    <div
                      class="modal fade mt-5"
                      id="exampleModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Referral Link
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            Here is your referral link
                            <br></br>
                            <input
                              className="referral-input"
                              value={window.location.href}
                              type="text"
                            />
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              onClick={() => {
                                this.myFunction();
                              }}
                              type="button"
                              class="btn btn-primary"
                            >
                              {this.state.modalText}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="Price">
                    <h2>
                      {' '}
                      {100 -
                        (product.discountPrice / product.marketPrice).toFixed(
                          2
                        ) *
                          100}
                      % off
                    </h2>
                    <span className="stars">
                      <button className="ratings-button btn-sm">
                        {' '}
                        4.5 <i class="fas fa-star"></i>{' '}
                      </button>
                      <p class="ratings-and-reviews">
                        {' '}
                        {Math.floor(Math.random() * 1000) + 500} Ratings &{' '}
                        {Math.floor(Math.random() * 300) + 50} Reviews
                      </p>
                    </span>
                    <span>
                      <h3>
                        <s> ₹ {product.marketPrice}</s>{' '}
                      </h3>
                      <h4> ₹ {product.discountPrice} </h4>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="other-info mx-3">
              <div class="card card-all text-white card-description">
                <div class="card-body">
                  <p>{' ' + product.description}</p>
                  <Link
                    to={`/product/${product._id}/edit`}
                    style={{ textDecoration: 'none' }}
                  ></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {recommendedProducts && recommendedProducts.length > 1 ? (
          <div className="row justify-content-center mt-5">
            <h1 className="text-center text-white mt-5 mb-3">
              People Who Bought This Also Bought
            </h1>

            <div
              className=" justify-content-around  mt-3 d-flex"
              id="allProducts"
            >
              {recommendedProducts &&
                recommendedProducts.map(function (recomproduct) {
                  if (product._id !== recomproduct._id) {
                    return (
                      <div
                        onClick={() => {
                          fetchData(recomproduct._id);
                        }}
                      >
                        <Product
                          product={recomproduct}
                          key={recomproduct._id}
                        />
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ cart, authUser }) => {
  return { cart, authUser };
};
export default connect(mapStateToProps)(productPage);
