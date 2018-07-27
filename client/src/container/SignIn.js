import { connect } from 'react-redux';
import SignIn from '../components/signIn/SignIn';
import { forgotPass } from '../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  forgotPass: mail => dispatch(forgotPass(mail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
