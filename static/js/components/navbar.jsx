/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');

var Navbar = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
          <div className="header">
              <h3 className="brand">PostBox</h3>
          </div>
      </div>
    );
  }
});

module.exports = Navbar;
