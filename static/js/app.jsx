/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Navbar = require('./components/navbar.jsx'),
    Board = require('./components/board.jsx'),
    mountNode = document.getElementById('postBox'),
    $ = require('jquery');

var App = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function(){
        this.fetchBoards();
    },
    fetchBoard: function(){
        $.getJSON('/',function(){

        });
    },
    render: function() {
        return (
            <div>
              <Navbar/>
              <Board data={this.props.items}/>
            </div>
        );
    }
});

var ITEMS = [
    {
        title: "ToDo",
        data:[
            {text: "From: Eric Larssen\r Subject: This is a test."},
            {text: "Two"},
            {text: "Three"}
        ],
    },
    {
        title: "In Progress",
        data:[{text: "Four"}]
    },
    {
        title: "Done",
        data:[]
    }
];

React.renderComponent(<App items={ITEMS}/>, mountNode);
