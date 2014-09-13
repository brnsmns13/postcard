/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    PostCardPanel = require('./panel.jsx');

var Board = React.createClass({
  render: function() {
    return (
      <div className="container-fluid board">
            <PostCardPanel title="Todo"/>
            <PostCardPanel title="In Progress"/>
            <PostCardPanel title="Done"/>
      </div>
    );
  }
});

module.exports = Board;
