import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignIn from '../components/signIn/SignIn';
import { forgotPass } from '../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  forgotPass: mail => dispatch(forgotPass(mail)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { match, location, staticContext } = ownProps;
  return {
    ...stateProps, ...dispatchProps, match, location, staticContext,
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignIn);
