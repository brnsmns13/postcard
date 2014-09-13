/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Card = require('./card.jsx');

var Panel = React.createClass({
  render: function() {
    return (
        <div className="col-md-3">
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.title}
                </div>
                <div className="panel-body">
                    <Card text={'test1'}/>
                    <Card text={'test2'}/>
                    <Card text={'test3'}/>
                </div>
            </div>
        </div>
    );
  }
});

module.exports = Panel;
