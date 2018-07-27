import React from 'react';
import queryString from 'query-string';
import { ToastStore } from 'react-toasts';
import './PassChange.sass';

class PassChange extends React.PureComponent {
  state = { pass: '', repass: '' };

  componentWillMount() {
    const { props } = this;
    console.log(props);
    const { token } = queryString.parse(props.location.search);
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
    const { pass, repass } = this.state;
    if (pass === repass) {

    } else {
      ToastStore.error('Password and confirm password are not equal');
    }
  }

  render() {
    const { pass, repass } = this.state;
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
        </form>
      </React.Fragment>
    );
  }
}

export default PassChange;
