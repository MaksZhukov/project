import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Main from '../components/Main';
import { checkToken } from '../../../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  checkToken: token => dispatch(checkToken(token)),
  push: path => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
