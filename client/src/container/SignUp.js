import { connect } from 'react-redux';
import SignUp from '../components/signUp/SignUp';
import { signUp } from '../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signUp: dataFromUser => dispatch(signUp(dataFromUser)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
