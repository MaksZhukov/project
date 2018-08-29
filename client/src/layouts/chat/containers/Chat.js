import { connect } from 'react-redux';
import Chat from '../components/Chat';
import {
  getAllMessages,
  getMessage,
  sendMessage,
  endConnect,
  startConnect,
} from '../../../actions/chat';
import { messagesSelector } from '../../../selectors';


const mapStateToProps = state => ({
  messages: messagesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getAllMessages: () => dispatch(getAllMessages()),
  getMessage: () => dispatch(getMessage()),
  sendMessage: data => dispatch(sendMessage(data)),
  endConnect: () => dispatch(endConnect()),
  startConnect: () => dispatch(startConnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
