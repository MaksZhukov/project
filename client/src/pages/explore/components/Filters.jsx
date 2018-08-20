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
import { PEGI_RATING, RATING } from '../../../constants';

const styles = theme => ({
  root: {
    width: '100%',
    alignSelf: 'flex-start',
    padding: '10px',
    zIndex: 1,
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
    search: '',
    filters: {
      date: null,
      genre: '',
      platform: '',
      gameEngine: '',
      PEGIRating: '',
      gameMode: '',
      rating: {
        min: RATING.MIN,
        max: RATING.MAX,
      },
    },
    isOpenFilters: false,
  }

  handleChangeFilters = name => (event) => {
    let value = null;
    if (name === 'date') {
      value = event.format();
    } else if (name === 'rating') {
      value = event;
    } else {
      value = event.target.value;
    }
    const { state } = this;
    const filters = { ...state.filters, [name]: value };
    this.setState({
      filters,
    });
  }

  handleChangeSearch = ({ target }) => {
    const { props, state } = this;
    if (!state.isOpenFilters) {
      this.setState({ search: target.value });
      props.changeData({ search: target.value });
      props.resetData(['games']);
      props.getDataGames({ search: target.value, filters: props.filters });
      props.resetCacheList();
    } else {
      this.setState({ search: target.value });
    }
  }

  handleCancel = () => {
    const { props } = this;
    this.setState({
      filters: {
        date: null,
        genre: '',
        platform: '',
        gameEngine: '',
        PEGIRating: '',
        gameMode: '',
        rating: {
          min: RATING.MIN,
          max: RATING.MAX,
        },
      },
      search: '',
    });
    props.resetData(['filters', 'search']);
  }

  handleSearch = () => {
    const { props, state } = this;
    props.resetData(['games']);
    props.changeData({ filters: state.filters, search: state.search });
    props.getDataGames({ search: state.search, filters: state.filters });
    props.resetCacheList();
  }

  handleChangePanel = (event, expanded) => {
    const { props } = this;
    this.setState({ isOpenFilters: expanded });
    const expandedPanelHeight = expanded ? 264 : 64;
    props.UpdateHeightHeaderAndFilter(80 + expandedPanelHeight);
  }

  render() {
    const { props, state } = this;
    const {
      classes, responseGetDataFilters,
    } = props;
    const { filters, search } = state;
    const {
      gameEngines, genres, gameModes, platforms, loading,
    } = responseGetDataFilters;
    if (loading === false) {
      return (
        <React.Fragment>
          <ExpansionPanel className={classes.root} onChange={this.handleChangePanel}>
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
                value={search}
                onChange={this.handleChangeSearch}
              />
            </ExpansionPanelDetails>
            <ExpansionPanelDetails className={classes.detailFilters}>
              <Grid container alignItems="flex-end">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    onChange={this.handleChangeFilters('date')}
                    animateYearScrolling
                    format="DD/MM/YYYY"
                    value={filters.date}
                    placeholder="Date"
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  id="select-genres"
                  select
                  value={filters.genre}
                  onChange={this.handleChangeFilters('genre')}
                  label="Genres"
                  className={classes.textField}
                >
                  {genres.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}

                </TextField>
                <TextField
                  id="select-platforms"
                  select
                  value={filters.platform}
                  onChange={this.handleChangeFilters('platform')}
                  label="Platforms"
                  className={classes.textField}
                >
                  {platforms.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="select-game-engines"
                  select
                  value={filters.gameEngine}
                  onChange={this.handleChangeFilters('gameEngine')}
                  label="Game Engines"
                  className={classes.textField}
                >
                  {gameEngines.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="select-pegi-rating"
                  select
                  value={filters.PEGIRating}
                  onChange={this.handleChangeFilters('PEGIRating')}
                  label="PEGI Rating"
                  className={classes.textField}
                >
                  {
                  PEGI_RATING.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))
                }
                </TextField>
                <TextField
                  id="select-game-modes"
                  select
                  value={filters.gameMode}
                  onChange={this.handleChangeFilters('gameMode')}
                  label="Game Modes"
                  className={classes.textField}
                >
                  {gameModes.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControl className={classes.textField}>
                  <Typography align="center" gutterBottom>
                    Rating
                  </Typography>
                  <InputRange
                    maxValue={RATING.MAX}
                    minValue={RATING.MIN}
                    value={filters.rating}
                    onChange={this.handleChangeFilters('rating')}
                  />
                </FormControl>
              </Grid>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button size="small" onClick={this.handleCancel}>
                  Cancel
              </Button>
              <Button size="small" color="primary" onClick={this.handleSearch}>
                  Search
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </React.Fragment>
      );
    }
    return null;
  }
}

export default withStyles(styles)(Filters);
