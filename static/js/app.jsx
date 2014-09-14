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

React.renderComponent(<App/>, mountNode);
