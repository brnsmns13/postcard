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
    handleUserDrop: function(id, card, sourcePanelTitle) {
        console.log(id);
        var data = this.state.data;
        var targetPanel = _.findWhere(data, {id: id});
        var sourcePanel = _.findWhere(data, {name: sourcePanelTitle});
        if (JSON.stringify(targetPanel) === JSON.stringify(sourcePanel)){
            return null;
        }
        if(!_.findWhere(targetPanel.cards, card))
            targetPanel.cards.push(card);
        var index = sourcePanel.cards.indexOf(_.findWhere(sourcePanel.cards, card));
        if (index > -1) {
            sourcePanel.cards.splice(index, 1);
        }
        this.forceUpdate();
        this.moveCard(card.id, id);
    },

    moveCard: function(cardId, panelId) {
        $.post('api/cards', {card_id: cardId, panel_id: panelId}, 'json');
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
