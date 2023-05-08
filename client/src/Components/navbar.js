import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { TextField } from '@material-ui/core/';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { logout } from '../actions/user';
import '../stylesheets/sidePannel.css';
class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '',
      toogle: false,
    };
  }
  onTextChange = (e) => {
    if (!e.target.value) {
      if (this.props.getProduct) this.props.getProduct();
    } else {
      this.setState({ product: e.target.value });
    }
  };

  ToogleNav = (val, toogleVal) => {
    document.getElementById('mySidepanel').style.width = val;
    this.setState({ toogle: toogleVal });
  };
  onClickLogout = () => {
    this.props.dispatch(logout());
  };
  render() {
    const { isAdmin, isLoggedIn } = this.props.authUser;
    let { getProduct } = this.props;
    const { toogle } = this.state;
    if (!getProduct) getProduct = () => console.log('products');
    return (
      <div>
        <div id="mySidepanel" class={`sidepanel `}>
          <a
            href="javascript:void(0)"
            class="closebtn"
            onClick={() => this.ToogleNav(0, false)}
          >
            &times;
          </a>
          <div>
            <div className="mt-4">
              <div
                class="list-group d-flex justify-content-between align-itmes-center"
                style={{ width: '290', backgroundColor: 'black' }}
              >
                <button
                  type="button"
                  class="list-group-item list-group-item-action bg-dark mt-2  d-none"
                  aria-current="true"
                >
                  The current button
                </button>
                <Link style={{ textDecoration: 'none' }} to="/">
                  <button
                    type="button"
                    class="list-group-item list-group-item-action ListItem mt-2"
                  >
                    Home
                  </button>
                </Link>

                <Link
                  style={{ textDecoration: 'none' }}
                  class="nav-link"
                  to="/user/cart"
                >
                  <button
                    type="button"
                    class="list-group-item list-group-item-action ListItem mt-2"
                  >
                    <ShoppingCartOutlinedIcon />
                  </button>
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/user/orders"
                    class="nav-link"
                    style={{ textDecoration: 'none' }}
                  >
                    <button
                      type="button"
                      class="list-group-item list-group-item-action ListItem mt-2"
                    >
                      My Orders
                    </button>
                  </Link>
                )}
                {isLoggedIn && isAdmin && (
                  <Link to="/admin/info" class="nav-link">
                    <button
                      type="button"
                      class="list-group-item list-group-item-action ListItem mt-2"
                      style={{ textDecoration: 'none' }}
                    >
                      <i class="fas fa-user"></i>
                    </button>
                  </Link>
                )}
                {isLoggedIn && isAdmin && (
                  <Link
                    to="/add/product"
                    class="nav-link"
                    style={{ textDecoration: 'none' }}
                  >
                    <button
                      type="button"
                      class="list-group-item list-group-item-action ListItem mt-2"
                    >
                      Add Product
                    </button>
                  </Link>
                )}
                {isLoggedIn && !isAdmin && (
                  <Link to="/admin/signup" class="nav-link">
                    <button
                      type="button"
                      class="list-group-item list-group-item-action ListItem mt-2"
                    >
                      Sell
                    </button>
                  </Link>
                )}

                <button
                  type="button"
                  class="list-group-item list-group-item-action bg-dark mt-2 d-none"
                  disabled
                >
                  A disabled button item
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky-top">
          <nav class="navbar navbar-expand-lg navbar-dark ProductsNavbar">
            <a
              onClick={() =>
                toogle
                  ? this.ToogleNav(0, false)
                  : this.ToogleNav('300px', true)
              }
              class="navbar-brand"
            >
              <DehazeIcon style={{ color: 'white', cursor: 'pointer' }} />
            </a>

            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="collapse navbar-collapse navbar-dark"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <Link class="nav-link" to="/products">
                    {' '}
                    Top Products <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li class="d-flex align-items-center">
                  <TextField
                    id="standard-basic"
                    class="ml-2"
                    // variant="outlined"
                    onChange={this.onTextChange}
                    style={{ backgroundColor: 'white' }}
                  />
                </li>
                <li class="d-flex align-items-center">
                  <button
                    type="button"
                    class="btn btn-outline-success btn-sm ml-1"
                    onClick={() => getProduct(this.state.product)}
                  >
                    <SearchIcon />
                  </button>
                </li>
              </ul>

              {!isLoggedIn && (
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link to="/user/auth" class="nav-link">
                      Register
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/user/auth" class="nav-link">
                      Login
                    </Link>
                  </li>
                </ul>
              )}
              {isLoggedIn && isAdmin && (
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link onClick={this.onClickLogout} class="nav-link">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
              {isLoggedIn && !isAdmin && (
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link onClick={this.onClickLogout} class="nav-link">
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  return { authUser };
};
export default connect(mapStateToProps)(Navbar);
