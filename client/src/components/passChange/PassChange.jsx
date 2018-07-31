import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import ToastStore from 'react-toasts';
import { Redirect } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import classNames from 'classnames';
import './PassChange.sass';

class PassChange extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = { pass: '', repass: '', token: '' };

  componentDidMount() {
    const { props } = this;
    const { token } = queryString.parse(props.location.search);
    this.setState({ token });
    if (token) {
      props.checkTokenChangePass(token);
    } else {
      props.history.push('/');
    }
  }

  handlerInput = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handlerChangePassSubmit = (event) => {
    event.preventDefault();
    const { pass, repass, token } = this.state;
    const { props } = this;
    if (pass === repass) {
      props.changePass({ token, pass });
    } else {
      ToastStore.error('Password and confirm password are not equal');
    }
  }

  render() {
    const { pass, repass } = this.state;
    const { user } = this.props;
    const loading = user.responseChangePass.loading === true;
    if (user.responseCheckTokenChangePass.loading === false) {
      if (user.responseCheckTokenChangePass.access) {
        return (
          <React.Fragment>
            <form className="form-pass-recovery form-sign" onSubmit={this.handlerChangePassSubmit}>
              <div className="form-group">
                <label htmlFor="form-pass-recovery-pass" className="form-pass-recovery-label-pass">
                  Password
                  <input id="form-pass-recovery-pass" required type="password" name="pass" className="form-pass-recovery-pass form-control" value={pass} onInput={this.handlerInput} />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="form-pass-recovery-repass" className="form-pass-recovery-label-repass">
                  Confirm the password
                  <input id="form-pass-recovery-repass" required type="password" name="repass" className="form-pass-recovery-repass form-control" value={repass} onInput={this.handlerInput} />
                </label>
              </div>
              <div className="form-group">
                <input type="submit" className="form-sign-up-submit btn btn-orange" value="Change" />
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

export default PassChange;
