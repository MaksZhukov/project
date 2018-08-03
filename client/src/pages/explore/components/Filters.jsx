import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    alignSelf: 'flex-start',
    marginTop: '75px',
    padding: '10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    alignSelf: 'center',
    fontWeight: theme.typography.fontWeightRegular,
  },
  detailSearch: {
    position: 'absolute',
    paddingLeft: '33%',
    top: '0',
    width: 'calc(100% - 150px)',
    margin: '0px 70px 0 80px',
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
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Filters
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.detailSearch}>
            <TextField
              label="Search games"
              margin="none"
              className={classes.textField}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.detailFilters}>
            <TextField
              label="Search games"
              margin="none"
              className={classes.textField}
            />
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button size="small">
                Cancel
            </Button>
            <Button size="small" color="primary">
                Search
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Filters);
