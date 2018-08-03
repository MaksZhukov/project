import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DatePicker from 'material-ui-pickers/DatePicker';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

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
  menuSelect: {
    width: 500,
  },
});

class Filters extends React.PureComponent {
  state = {
    genre: '',
    platform: '',
    gameEngine: '',
    PEGLRating: '',
    gameMode: '',
    rating: {
      min: 3,
      max: 5,
    },
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

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
            <Grid container alignItems="flex-end">
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  onChange={() => { console.log('hello'); }}
                  animateYearScrolling
                  format="DD/MM/YYYY"
                />
              </MuiPickersUtilsProvider>
              <TextField
                id="select-genres"
                select
                value={this.state.genre}
                onChange={this.handleChange('genre')}
                label="Genres"
                className={classes.textField}
              >
                <MenuItem key={42} value={42}>
                  {42}
                </MenuItem>
                <MenuItem key={43} value={43}>
                  {43}
                </MenuItem>
                <MenuItem key={44} value={44}>
                  {44}
                </MenuItem>
              </TextField>
              <TextField
                id="select-platforms"
                select
                value={this.state.platform}
                onChange={this.handleChange('platform')}
                label="Platforms"
                className={classes.textField}
              >
                <MenuItem key={42} value={42}>
                  {42}
                </MenuItem>
                <MenuItem key={43} value={43}>
                  {43}
                </MenuItem>
                <MenuItem key={44} value={44}>
                  {44}
                </MenuItem>
              </TextField>
              <TextField
                id="select-game-engines"
                select
                value={this.state.gameEngine}
                onChange={this.handleChange('gameEngine')}
                label="Game Engines"
                className={classes.textField}
              >
                <MenuItem key={42} value={42}>
                  {42}
                </MenuItem>
                <MenuItem key={43} value={43}>
                  {43}
                </MenuItem>
                <MenuItem key={44} value={44}>
                  {44}
                </MenuItem>
              </TextField>
              <TextField
                id="select-pegl-rating"
                select
                value={this.state.PEGLRating}
                onChange={this.handleChange('PEGLRating')}
                label="PEGL Rating"
                className={classes.textField}
              >
                <MenuItem key={42} value={42}>
                  {42}
                </MenuItem>
                <MenuItem key={43} value={43}>
                  {43}
                </MenuItem>
                <MenuItem key={44} value={44}>
                  {44}
                </MenuItem>
              </TextField>
              <TextField
                id="select-game-modes"
                select
                value={this.state.gameMode}
                onChange={this.handleChange('gameMode')}
                label="Game Modes"
                className={classes.textField}
              >
                <MenuItem key={42} value={42}>
                  {42}
                </MenuItem>
                <MenuItem key={43} value={43}>
                  {43}
                </MenuItem>
                <MenuItem key={44} value={44}>
                  {44}
                </MenuItem>
              </TextField>
              <FormControl className={classes.textField}>
                <Typography align="center" gutterBottom>
                  Rating
                </Typography>
                <InputRange
                  maxValue={20}
                  minValue={0}
                  value={this.state.rating}
                  onChange={value => this.setState({ rating: value })}
                  onChangeComplete={value => console.log(value)}
                />
              </FormControl>
            </Grid>
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
