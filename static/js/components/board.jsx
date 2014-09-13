/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Panel = require('./panel.jsx');

var Board = React.createClass({
  render: function() {
    return (
      <div className="container-fluid board">
        <div className="row equal">
            <Panel title="Todo"/>
            <Panel title="In Progress"/>
            <Panel title="Done"/>
        </div>
      </div>
    );
  }
});

module.exports = Board;
