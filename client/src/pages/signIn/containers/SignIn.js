import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import { forgotPass, signIn, checkToken } from '../../../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  forgotPass: mail => dispatch(forgotPass(mail)),
  signIn: dataFromUser => dispatch(signIn(dataFromUser)),
  checkToken: token => dispatch(checkToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
