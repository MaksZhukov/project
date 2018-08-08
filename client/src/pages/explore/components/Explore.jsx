import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Filters from './Filters';
import CardGame from './CardGame';


const styles = ({
  gridImages: {
    padding: '20px',
  },
  progress: {
    margin: 'auto',
    display: 'block',
  },
});
class Explore extends React.PureComponent {
  componentWillMount() {
    const { props } = this;
    props.getDataFilters();
    props.getDataGames({ search: props.search, filters: props.filters });
    window.addEventListener('scroll', this.handlerScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlerScroll);
  }

  handlerScroll = () => {
    const { props } = this;
    const { responseGetDataGames, games } = props;
    if (!responseGetDataGames.loading
      && window.scrollY >= document.body.scrollHeight - window.innerHeight - 100) {
      props.getDataGames({ offset: games.length, search: props.search, filter: props.filter });
    }
  }

  render() {
    const { props } = this;
    const {
      classes, games, getDataGames, resetData, responseGetDataGames, responseGetDataFilters,
    } = props;
    return (
      <React.Fragment>
        <Filters
          responseGetDataFilters={responseGetDataFilters}
          changeData={props.changeData}
          getDataGames={getDataGames}
          resetData={resetData}
        />
        <div className={classes.gridImages}>
          <Grid container spacing={40}>
            {games ? games.map(gameInfo => (
              <Grid key={gameInfo.id} item xs={3}>
                <CardGame gameInfo={gameInfo} />
              </Grid>
            )) : null}
          </Grid>
        </div>
        {responseGetDataGames.loading === true
          ? (<CircularProgress className={classes.progress} size={50} />)
          : null
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Explore);
