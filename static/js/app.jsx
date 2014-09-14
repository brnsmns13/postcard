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
        this.fetchBoard();
    },
    fetchBoard: function(){
        $.getJSON('/api/boards', function(response){
            this.setState({data: response});
        }.bind(this));
    },
    render: function() {
        return (
            <div>
              <Navbar email={this.state.data.id}/>
              <Board board={this.state.data}/>
            </div>
        );
    }
});

<<<<<<< HEAD
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
=======
React.renderComponent(<App/>, mountNode);
>>>>>>> e87e0248fe09bd328ce11ad78dee3cc355484980
