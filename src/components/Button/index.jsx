import P from 'prop-types';
import React, { Component } from 'react';
import './styles.css';
export default class Button extends Component {
  render() {
    const { text, onClick, disable } = this.props;
    return (
      <button className="button" onClick={onClick} disabled={disable}>
        {text}
      </button>
    );
  }
}
Button.defaultProps = {
  disable: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disable: P.bool,
};
