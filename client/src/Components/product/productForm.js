import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { productFormValidate } from '../../helpers/validate';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Grid,
  Button,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
} from '@material-ui/core/';
import axios from 'axios';

import {
  RenderTextInput,
  RenderTextArea,
  Navbar,
  ImageComponent,
  Flash,
} from '..';
import { productAdd, productFormUnmount } from '../../actions/product';

import '../../stylesheets/styles.css';

const src = 'https://img.icons8.com/nolan/64/left-view.png';

class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      file: {},
      admin: null
    };
  }
  onImageChange = (e) => {
    this.setState({ file: e.target.files });
  };
  handleSubmit = async (values) => {
    const { dispatch } = this.props;
    var formData = new FormData();
    for (const key of Object.keys(this.state.file)) {
      formData.append('image', this.state.file[key]);
    }
    formData.append('category', this.state.admin.category)
    for (let key in values) {
      formData.append(key, values[key]);
    }

    dispatch(productAdd(formData));
  };
  componentWillUnmount = () => {
    this.props.dispatch(productFormUnmount());
  };
  componentDidMount = async () => {
    const admin = await axios.get('/api/currentAdmin');
    console.log("Admin--->", admin)
    this.setState({ admin: admin.data });
  };
  render() {
    const { handleSubmit, submitting } = this.props;
    const { isProductAdded } = this.props.product;
    const { admin } = this.state;
    if (isProductAdded) {
      return <Redirect to="/admin/info" />;
    }
    return (
      <div>
        <Navbar />
        <Flash />
        <div className="my-4 paperStyle row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-7 col-sm-8 col-10">
            <Grid>
              <Paper elevation={10} style={{ borderRadius: '5%' }}>
                <form
                  method="GET"
                  onSubmit={handleSubmit(this.handleSubmit)}
                  className="px-3"
                  encType="multipart/form-data"
                  action="/products"
                >
                  <Grid align="center" className="py-3 my-2">
                    <Avatar src={src} alt="Lock-img">
                      {' '}
                    </Avatar>
                    <h1>Add Product</h1>
                  </Grid>

                  <Field
                    name="name"
                    label="Product Name"
                    type="text"
                    component={RenderTextInput}
                  />
                  <Field
                    name="marketPrice"
                    label="Market Price"
                    type="number"
                    component={RenderTextInput}
                  />
                  <Field
                    name="discountPrice"
                    label="Discount Price"
                    type="number"
                    component={RenderTextInput}
                  />
                  <Field
                    name="description"
                    label="Product Description"
                    component={RenderTextArea}
                  />
                  <Field
                    name="image"
                    type="file"
                    addImage={this.onImageChange}
                    multipleImages={true}
                    heading="Add Images"
                    component={ImageComponent}
                  />

                  <Grid align="center">
                    <button
                      style={{
                        marginBottom: '2rem',
                        marginTop: '1rem',
                      }}
                      type="submit"
                      disabled={submitting}
                    >
                      Add Product
                    </button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </div>
        </div>
      </div>
    )

  }
}
const ProductFormRedux = reduxForm({
  form: 'productForm', // a unique identifier for this form
  validate: productFormValidate,
})(ProductForm);
const mapStatetoProps = ({ product }) => {
  return { product };
};
export default connect(mapStatetoProps)(ProductFormRedux);
