import { connect } from 'react-redux';
import Chat from '../components/Chat';
import {
  sendMessage,
  endConnect,
  startConnect,
} from '../../../actions/chat';


const mapStateToProps = state => ({
  messages: state.chat.messages,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: data => dispatch(sendMessage(data)),
  endConnect: () => dispatch(endConnect()),
  startConnect: () => dispatch(startConnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
