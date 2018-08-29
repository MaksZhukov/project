import React from 'react';
import moment from 'moment';
import {
  TitleBar,
  TextInput,
  MessageList,
  Message,
  MessageText,
  TextComposer,
  Row,
  Fill,
  Fit,
  IconButton,
  SendButton,
  CloseIcon,
} from '@livechat/ui-kit';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  maximized: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  messageList: {
    flexGrow: 1,
    minHeight: 0,
    height: '100%',
  },
});

class Maximized extends React.PureComponent {
  submit = (message) => {
    const { props } = this;
    props.sendMessage({ message, userId: props.userId });
  }

  render() {
    const { props } = this;
    const { minimize, messages, classes } = props;
    return (
      <div className={classes.maximized}>
        <TitleBar
          rightIcons={[
            <IconButton key="close" onClick={minimize}>
              <CloseIcon />
            </IconButton>,
          ]}
          title="Welcome to LiveChat"
        />
        <div className={classes.messageList}>
          <MessageList active>
            {messages.map(messageInfo => (
              <Message key={messageInfo.date} authorName={messageInfo.name} date={moment(messageInfo.date).format('MMMM DD hh:mm')}>
                <MessageText>
                  {messageInfo.message}
                </MessageText>
              </Message>))}
          </MessageList>
        </div>
        <TextComposer onSend={this.submit}>
          <Row align="center">
            <Fill>
              <TextInput />
            </Fill>
            <Fit>
              <SendButton />
            </Fit>
          </Row>
        </TextComposer>
      </div>);
  }
}

export default withStyles(styles)(Maximized);
