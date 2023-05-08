import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Product, Flash } from '../';
import { connect } from 'react-redux';
import styles from '../../stylesheets/styles.css';
import '../../stylesheets/allProducts.css';
import { getAllProducts } from '../../actions/product';
class allProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount = async () => {
    const res = await axios.get('/api/products');
    this.props.dispatch(getAllProducts());
    this.setState({ data: res.data });
  };
  getProduct = async (str = '') => {
    var r = new RegExp(str, 'i');

    const { products } = this.props.product;
    console.log('getProducts products', products);
    const reqArray = products.filter((product) => product.name.match(r));
    this.setState({ data: reqArray });
  };
  render() {
    const { data } = this.state;
    if (data.length == 0) {
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
        <Navbar getProduct={this.getProduct} />
        <Flash />
        <div>
          <div
            id={`carousel-1`}
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            h="50"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target={`#carousel-1`}
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target={`#carousel-1`}
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target={`#carousel-1`}
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  style={{ height: '60vh' }}
                  src="https://s3b.cashify.in/gpro/uploads/2019/09/16135517/buyback_offer_banner.png"
                  class="d-block w-100 carousel-offer-img"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  style={{ height: '60vh' }}
                  src="https://www.rummycentral.com/static/promotion_images/diwali-dhamka-inner-promotion.f14592593a32.png"
                  class="d-block w-100 carousel-offer-img"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  style={{ height: '60vh' }}
                  src="https://s3b.cashify.in/gpro/uploads/2019/09/16135517/buyback_offer_banner.png"
                  class="d-block w-100 carousel-offer-img"
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target={`#carousel-1`}
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target={`#carousel-1`}
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className=" justify-content-around  mt-3 d-flex" id="allProducts">
          {data.map(function (product) {
            console.log(product)
            return (
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: 'none' }}
              // className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-6 mb-5 d-grid float-start"
              >
                <Product product={product} key={product._id} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ product }) => {
  return { product };
};
export default connect(mapStateToProps)(allProducts);
