import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, ChatIcon } from '@livechat/ui-kit';

const styles = () => ({
  minimized: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    background: '#0093FF',
    color: '#fff',
    borderRadius: '50%',
    cursor: 'pointer',
  },
});

class Minimized extends React.PureComponent {
  render() {
    const { props } = this;
    const { classes, maximize } = props;
    return (
      <div
        onClick={maximize}
        className={classes.minimized}
      >
        <IconButton>
          <ChatIcon />
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(Minimized);
