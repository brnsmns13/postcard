/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Panel = require('react-bootstrap/Panel'),
    Card = require('./card.jsx');

var PostCardPanel = React.createClass({
  render: function() {
    return (
        <div className="col-md-3">
            <Panel header={this.props.title}>
                <Card text={'test1'}/>
                <Card text={'test2'}/>
                <Card text={'test3'}/>
            </Panel>
        </div>
    );
  }
});

module.exports = PostCardPanel;
