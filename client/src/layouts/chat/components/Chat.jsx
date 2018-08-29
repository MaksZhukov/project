import React from 'react';
import {
  ThemeProvider,
  FixedWrapper,
} from '@livechat/ui-kit';
import { withStyles } from '@material-ui/core/styles';
import Maximized from './Maximized';
import Minimized from './Minimized';

class Chat extends React.PureComponent {
  componentWillMount() {
    const { props } = this;
    props.startConnect();
  }

  componentWillUnmount() {
    const { props } = this;
    props.endConnect();
  }

  render() {
    const { props } = this;
    const { messages, userId, sendMessage } = props;
    return (
      <React.Fragment>
        <ThemeProvider>
          <FixedWrapper.Root>
            <FixedWrapper.Maximized>
              <Maximized minimize={this.props.minimize} messages={messages} userId={userId} sendMessage={sendMessage} />
            </FixedWrapper.Maximized>
            <FixedWrapper.Minimized active>
              <Minimized maximize={this.props.maximize} />
            </FixedWrapper.Minimized>
          </FixedWrapper.Root>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default Chat;
