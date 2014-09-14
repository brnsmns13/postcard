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
        $.getJSON('api/all', function(response){
            this.setState({data: response});
        }.bind(this));
    },
    handleUserDrop: function(id, item, sourcePanelTitle) {
        var data = this.state.data;
        var targetPanel = _.findWhere(data, {id: id});
        var sourcePanel = _.findWhere(data, {name: sourcePanelTitle});
        if (JSON.stringify(targetPanel) === JSON.stringify(sourcePanel)){
            return null;
        }
        if(!_.findWhere(targetPanel.cards, item))
            targetPanel.cards.push(item);
        var index = sourcePanel.cards.indexOf(_.findWhere(sourcePanel.cards, item));
        if (index > -1) {
            sourcePanel.cards.splice(index, 1);
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
        this.state.data.forEach(function(panel){

            panels['panel-'+panel.id] = <PostCardPanel id={panel.id} title={panel.name} data={panel.cards} onUserDrop={this.handleUserDrop}/>;
        }.bind(this));
        return (
            <div className="container-fluid board">
                {panels}
            </div>
        );
    }
});


module.exports = Board;
