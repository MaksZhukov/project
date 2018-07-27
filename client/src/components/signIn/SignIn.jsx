import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SignIn.sass';
import { ToastContainer, ToastStore } from 'react-toasts';

class SignIn extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = { mail: '', pass: '' };

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.responseForgotPass !== 'loading') {
      const { status, message } = user.responseForgotPass;
      ToastStore[status](message);
    }
  }

  handlerInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handlerForgotPass = () => {
    const { props, state } = this;
    const { mail } = state;
    props.forgotPass(mail);
  }

  render() {
    const { mail, pass } = this.state;
    return (
      <React.Fragment>
        <form className="form-sign-in form-sign">
          <div className="form-group justify-content-around">
            <Link to="/sign-in" className="btn btn-active text-uppercase link-sign-in">
            sign in
            </Link>
            <Link to="/sign-up" className="btn text-uppercase link-sign-up">
            join us!
            </Link>
          </div>
          <div className="form-group">
            <label htmlFor="form-sign-in-mail" className="form-sign-in-label-mail">
            Email Address
              <input id="form-sign-in-mail" type="email" name="mail" className="form-sign-in-mail form-control" value={mail} onInput={this.handlerInput} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="form-sign-in-pass" className="form-sign-in-label-pass">
            Password
              <input id="form-sign-in-pass" type="password" name="pass" className="form-sign-in-pass form-control" value={pass} onInput={this.handlerInput} />
            </label>
          </div>
          <div className="form-group">
            <input type="submit" className="form-sign-in-submit btn btn-orange" value="Sign In" />
            <button type="button" className="form-sign-in-forgot-pass btn btn-white" onClick={this.handlerForgotPass}>
            Forgot Password
            </button>
          </div>
          <div className="form-sign-in-with-title text-dashed-lines">
          Sign In With
          </div>
          <div className="form-group mb-none">
            <a href="/" className="form-sign-in-facebook btn btn-blue">
            Facebook
            </a>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default SignIn;
