import React from 'react';
import NavBar from '../../../layouts/navBar/NavBar';

class Explore extends React.PureComponent {
  render() {
    const { props } = this;
    return (
      <React.Fragment>
        <NavBar checkToken={props.checkToken} responseCheckToken={props.user.responseCheckToken} push={props.push} location={props.location} />
      </React.Fragment>
    );
  }
}

export default Explore;
