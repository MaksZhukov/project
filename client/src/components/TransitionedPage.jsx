import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const TransitionedPage = (WrappedComponent) => {
  const TransitionedComponent = props => (
    <CSSTransitionGroup
      transitionAppear
      transitionAppearTimeout={600}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={100}
      transitionName="slide"
    >
      <WrappedComponent {...props} />
    </CSSTransitionGroup>
  );
  return TransitionedComponent;
};

export default TransitionedPage;
