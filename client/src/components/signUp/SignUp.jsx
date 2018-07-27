import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.sass';

class SignIn extends React.PureComponent {
  state = { name: '', mail: '', pass: '' };

  handlerInputName({ target }) {
    this.setState({ name: target.value });
  }

  handlerInputMail({ target }) {
    this.setState({ mail: target.value });
  }

  handlerInputPass({ target }) {
    this.setState({ pass: target.value });
  }

  render() {
    const { name, mail, pass } = this.state;
    return (
      <form className="form-sign-up form-sign">
        <div className="form-group justify-content-around">
          <Link to="/sign-in" className="btn text-uppercase link-sign-in">
            sign in
          </Link>
          <Link to="/sign-up" className="btn btn-active text-uppercase link-sign-up">
            join us!
          </Link>
        </div>
        <div className="form-group">
          <label htmlFor="form-sign-up-name" className="form-sign-up-label-name">
            Name
            <input id="form-sign-up-name" type="email" className="form-sign-up-name form-control" value={name} onInput={this.handlerInputName} />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="form-sign-up-mail" className="form-sign-up-label-mail">
            Email Address
            <input id="form-sign-up-mail" type="email" className="form-sign-up-mail form-control" value={mail} onInput={this.handlerInputMail} />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="form-sign-up-pass" className="form-sign-up-label-pass">
            Password
            <input id="form-sign-up-pass" type="email" className="form-sign-up-pass form-control" value={pass} onInput={this.handlerInputPass} />
          </label>
        </div>
        <div className="form-group">
          <input type="submit" className="form-sign-up-submit btn btn-orange" value="Join Now" />
        </div>
        <div className="form-sign-up-with-title text-dashed-lines">
          Register With
        </div>
        <div className="form-group mb-none">
          <a href="http://localhost:3000/auth/facebook" className="form-sign-up-facebook btn btn-blue">
            Facebook
          </a>
        </div>
      </form>
    );
  }
}

export default SignIn;
