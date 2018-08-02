import React from 'react';
import NavBar from '../../../layouts/navBar/NavBar';
import Filters from './Filters';

class Explore extends React.PureComponent {
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <NavBar checkToken={props.checkToken} responseCheckToken={props.user.responseCheckToken} push={props.push} location={props.location} />
        <Filters />
      </React.Fragment>
    );
  }
}

export default Explore;
