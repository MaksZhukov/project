import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const TransitionedPage = (WrappedComponent) => {
  const TransitionedComponent = props => (
    <CSSTransitionGroup
      transitionAppear
      transitionAppearTimeout={1000}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={100}
      transitionName="slide"
      component="div"
      className="transition-element"
    >
      <WrappedComponent {...props} />
    </CSSTransitionGroup>
  );
  return TransitionedComponent;
};

export default TransitionedPage;
