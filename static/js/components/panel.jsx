/** @jsx React.DOM */
'use strict';

var React = window.React = require('react');

var Panel = React.createClass({
  render: function() {
    return (
        <div className="col-md-3">
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.title}
                </div>
                <div className="panel-body">
                    <p>Test</p>
                </div>
            </div>
        </div>
    );
  }
});

module.exports = Panel;
