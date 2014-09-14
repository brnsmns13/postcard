/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    PostCardPanel = require('./panel.jsx'),
    $ = require('jquery'),
    _ = require('lodash');

var Board = React.createClass({
    getInitialState: function() {
        return {board: this.props.board, data: []};
    },
    componentDidMount: function() {
        $.getJSON('api/', function(response){
            console.log(response);
        }.bind(this));
    },
    handleUserDrop: function(id, item, sourcePanelTitle) {
        var targetPanel = this.state.cards[id];
        var sourcePanel = _.findWhere(this.state.cards, {title: sourcePanelTitle});
        if (JSON.stringify(targetPanel) === JSON.stringify(sourcePanel)){
            return null;
        }
        if(!_.findWhere(targetPanel.data, item))
            targetPanel.data.push(item);
        var index = sourcePanel.data.indexOf(_.findWhere(sourcePanel.data, item));
        if (index > -1) {
            sourcePanel.data.splice(index, 1);
        }
        this.forceUpdate();
    },

    moveCard: function(card, newPanel) {
        //TODO: Make ajax
    },
    render: function() {
        if (this.state.data.length === 0 ){
            return null;
        }
        var panels = {};
        this.props.data.map(function(panel, i){
            panels['panel-'+i] = <PostCardPanel id={i} title={panel.title} data={panel.data} onUserDrop={this.handleUserDrop}/>;
        }.bind(this));
        return (
            <div className="container-fluid board">
                {panels}
            </div>
        );
    }
});


module.exports = Board;
