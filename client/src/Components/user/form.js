// packages
import React from 'react';

// components
import { Login, Signup, Navbar, Flash } from '../';

// stylesheet
import slidingStyles from '../../stylesheets/slidingStyles.css';

function UserForm(props) {
  function add() {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  }

  function remove() {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  }

  return (
    <div>
      <Navbar />
      <Flash />
      <div class="container mt-5" id="container">
        <div class="form-container sign-up-container">
          <Signup {...props} />
        </div>
        <div class="form-container sign-in-container">
          <Login {...props} />
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details to start a wonderful journey with us.</p>
              <button class="ghost" id="signUp" onClick={remove}>
                Sign Up
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us, please login with your details.
              </p>
              <button class="ghost" id="signIn" onClick={add}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
