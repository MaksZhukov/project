import { connect } from 'react-redux';
import SignUp from '../components/signUp/SignUp';
import { signUp } from '../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signUp: dataFromUser => dispatch(signUp(dataFromUser)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { match, location, staticContext } = ownProps;
  return {
    ...stateProps, ...dispatchProps, match, location, staticContext,
  };
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignUp);
