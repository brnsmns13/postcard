/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');

var Card = React.createClass({
  render: function() {
    return (
      <div className="button-group post-card">
        <div className="btn btn-default" type="button">{this.props.text}</div>
      </div>
    );
  }
});

module.exports = Card;
