import { connect } from 'react-redux';
import PassChange from '../components/passChange/PassChange';
import { checkTokenChangePass, changePass } from '../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  checkTokenChangePass: token => dispatch(checkTokenChangePass(token)),
  changePass: (token, pass) => dispatch(changePass(token, pass)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { match, location, staticContext } = ownProps;
  return {
    ...stateProps, ...dispatchProps, match, location, staticContext,
  };
};


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PassChange);
