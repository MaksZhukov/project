import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import './SignUp.sass';


class SignUp extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = {
    name: '', mail: '', pass: '', isToken: false,
  };

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.setState({ isToken: true });
    }
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  handlerInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    const { props, state } = this;
    props.signUp({ name: state.name, mail: state.mail, pass: state.pass });
  }

  render() {
    const {
      name, mail, pass, isToken,
    } = this.state;
    const { user } = this.props;
    const loading = user.responseSignUp.loading === true;
    if (user.responseCheckToken.loading === false || !isToken) {
      if (!user.userInfo) {
        return (
          <React.Fragment>
            <form className="form-sign-up form-sign" onSubmit={this.handlerSubmit}>
              <div className="form-group justify-content-around">
                <Link
                  to="/sign-in"
                  className="btn text-uppercase link-sign-in"
                >



                sign in
</Link>
                <Link to="/sign-up" className="btn btn-active text-uppercase link-sign-up">



                join us!
</Link>
              </div>
              <div className="form-group">
                <label htmlFor="form-sign-up-name" className="form-sign-up-label-name">



                Name
<input id="form-sign-up-name" required name="name" type="text" className="form-sign-up-name form-control" value={name} onInput={this.handlerInput} />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="form-sign-up-mail" className="form-sign-up-label-mail">



              Email Address
<input id="form-sign-up-mail" required type="email" name="mail" className="form-sign-up-mail form-control" value={mail} onInput={this.handlerInput} />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="form-sign-up-pass" className="form-sign-up-label-pass">




              Password
<input id="form-sign-up-pass" required type="password" name="pass" className="form-sign-up-pass form-control" value={pass} onInput={this.handlerInput} />
                </label>
              </div>
              <div className="form-group">
                <input type="submit" className="form-sign-up-submit btn btn-orange" value="Join Now" />
              </div>
              <div className="form-sign-up-with-title text-dashed-lines">




            Register With
</div>
              <div className="form-group mb-none">
                <a href={config.signUpFacebookUrl} className="form-sign-up-facebook btn btn-blue">



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
          </React.Fragment>);
      }
      return <Redirect to="/" />;
    }
    return null;
  }
}

export default SignUp;
