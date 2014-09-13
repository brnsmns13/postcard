/** @jsx React.DOM */
'use strict';

var React = require('react'),
    mountNode = document.getElementById('content');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <p>Hello World</p>
      </div>
    );
  }
});

React.renderComponent(<App />, mountNode);
