/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    PostCardPanel = require('./panel.jsx');

var Board = React.createClass({
  render: function() {
    var data = [{id:'0', text:'test0'}, {id:'1', text:'test1'}, {id:'2', text:'test2'}];
    return (
      <div className="container-fluid board">
            <PostCardPanel title="Todo" data={data}/>
            <PostCardPanel title="In Progress" data={data}/>
            <PostCardPanel title="Done" data={data}/>
      </div>
    );
  }
});

module.exports = Board;
