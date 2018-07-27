import React from 'react';
import { Link } from 'react-router-dom';
import './SignIn.sass';

class SignIn extends React.PureComponent {
  state = { mail: '', pass: '' };

  handlerInputMail({ target }) {
    this.setState({ mail: target.value });
  }

  handlerInputPass({ target }) {
    this.setState({ pass: target.value });
  }

  render() {
    const { mail, pass } = this.state;
    return (
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
            <input id="form-sign-in-mail" type="email" className="form-sign-in-mail form-control" value={mail} onInput={this.handlerInputMail} />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="form-sign-in-pass" className="form-sign-in-label-pass">
            Password
            <input id="form-sign-in-pass" type="email" className="form-sign-in-pass form-control" value={pass} onInput={this.handlerInputPass} />
          </label>
        </div>
        <div className="form-group">
          <input type="submit" className="form-sign-in-submit btn btn-orange" value="Sign In" />
          <a href="/" className="form-sign-in-forgot-link">
            Forgot Password
          </a>
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
    );
  }
}

export default SignIn;
