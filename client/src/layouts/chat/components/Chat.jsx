import React from 'react';
import {
  ThemeProvider,
  FixedWrapper,
} from '@livechat/ui-kit';
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
    return (
      <React.Fragment>
        <ThemeProvider>
          <FixedWrapper.Root>
            <FixedWrapper.Maximized>
              <Maximized {...this.props} />
            </FixedWrapper.Maximized>
            <FixedWrapper.Minimized active>
              <Minimized {...this.props} />
            </FixedWrapper.Minimized>
          </FixedWrapper.Root>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default Chat;
