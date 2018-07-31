import { connect } from 'react-redux';
import SignIn from '../components/signIn/SignIn';
import { forgotPass, signIn } from '../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  forgotPass: mail => dispatch(forgotPass(mail)),
  signIn: dataFromUser => dispatch(signIn(dataFromUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
