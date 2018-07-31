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


export default connect(mapStateToProps, mapDispatchToProps)(PassChange);
