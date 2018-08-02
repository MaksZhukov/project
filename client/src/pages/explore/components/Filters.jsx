import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    alignSelf: 'flex-start',
    marginTop: '75px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    alignSelf: 'center',
    fontWeight: theme.typography.fontWeightRegular,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Filters extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ExpansionPanel className={classes.root} onChange={(event) => { console.log(event.preventDefault()); }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Filters
            </Typography>
            <TextField
              label="Search games"
              margin="none"
              className={classes.textField}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Filters);
