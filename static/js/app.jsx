/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Navbar = require('./components/navbar.jsx'),
    Board = require('./components/board.jsx'),
    mountNode = document.getElementById('postBox');

var App = React.createClass({
  render: function() {
    return (
        <div>
          <Navbar/>
          <Board/>
        </div>
    );
  }
});

React.renderComponent(<App />, mountNode);
