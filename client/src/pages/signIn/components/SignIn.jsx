import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import classNames from 'classnames';

import './SignIn.sass';

class SignIn extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = { mail: '', pass: '', isToken: false };

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.setState({ isToken: true });
    }
  }

  handlerInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    const { props, state } = this;
    props.signIn({ mail: state.mail, pass: state.pass });
  }

  handlerForgotPass = () => {
    const { props, state } = this;
    const { mail } = state;
    props.forgotPass(mail);
  }

  render() {
    const { mail, pass, isToken } = this.state;
    const { user } = this.props;
    const loading = user.responseForgotPass.loading === true
    || user.responseSignIn.loading === true;
    if (user.responseCheckToken.loading === false || !isToken) {
      if (!user.userInfo) {
        return (
          <React.Fragment>
            <form className="form-sign-in form-sign" onSubmit={this.handlerSubmit}>
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
                  <input id="form-sign-in-mail" required type="email" name="mail" className="form-sign-in-mail form-control" value={mail} onInput={this.handlerInput} />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="form-sign-in-pass" className="form-sign-in-label-pass">
                Password
                  <input id="form-sign-in-pass" required type="password" name="pass" className="form-sign-in-pass form-control" value={pass} onInput={this.handlerInput} />
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
                <a href={`${config.serverUrl}/sign-in/facebook`} className="form-sign-in-facebook btn btn-blue">
                  Facebook
                </a>
              </div>
              <div className={classNames({ loader: true, 'loader-active': loading })}>
                <FadeLoader
                  color="#123abc"
                  loading={loading}
                />
              </div>
            </form>
          </React.Fragment>
        );
      }
      return <Redirect to="/" />;
    }
    return null;
  }
}

export default SignIn;
