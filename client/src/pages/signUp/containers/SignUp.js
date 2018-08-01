import { connect } from 'react-redux';
import SignUp from '../components/SignUp';
import { signUp, checkToken } from '../../../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signUp: dataFromUser => dispatch(signUp(dataFromUser)),
  checkToken: token => dispatch(checkToken(token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
