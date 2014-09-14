/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Navbar = require('./components/navbar.jsx'),
    Board = require('./components/board.jsx'),
    mountNode = document.getElementById('postBox'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
    ButtonGroup = require('react-bootstrap/ButtonGroup'),
    Button = require('react-bootstrap/Button'),
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
              <div className={"tags"}>
                  <ButtonGroup bsSize="small">
                    <h4>Tags: </h4>
                  </ButtonGroup>
                  <ButtonGroup bsSize="small">
                    <Button>Family</Button>
                  </ButtonGroup>
                  <ButtonGroup bsSize="small">
                    <Button>School</Button>
                  </ButtonGroup>
                  <ButtonGroup bsSize="small">
                    <Button>Work</Button>
                  </ButtonGroup>
              </div>
              <Board board={this.state.data}/>
            </div>
        );
    }
});

React.renderComponent(<App/>, mountNode);
