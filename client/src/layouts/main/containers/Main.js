import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import Main from '../components/Main';
import { checkToken } from '../../../actions/user';


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  checkToken: token => dispatch(checkToken(token)),
  push: path => dispatch(push(path)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
