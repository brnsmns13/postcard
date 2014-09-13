/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Panel = require('react-bootstrap/Panel'),
    Card = require('./card.jsx');

var PostCardPanel = React.createClass({
    getInitialState: function() {
        return {data: this.props.data};
    },

    allowDrop: function(ev) {
        ev.preventDefault();
    },

    drop: function(ev) {
        ev.preventDefault();
        var droppedItem = JSON.parse(ev.dataTransfer.getData("draggedItem"));
        var sourcePanel = JSON.parse(ev.dataTransfer.getData("sourcePanel"));
        this.props.onUserDrop(this.props.id, droppedItem, sourcePanel);
    },

    render: function() {
        var rows = []
        var lastCategory = null;
        if (this.state.data) {
            this.state.data.map(function(item, i) {
                rows.push(<Card item={item} panel={this.props.title}/>)
            }.bind(this));
        }
        return (
            <div className="col-md-3">
                <Panel onDragOver={this.allowDrop} onDrop={this.drop} header={this.props.title}>
                    {rows}
                </Panel>
            </div>
        );
    }
});

module.exports = PostCardPanel;
