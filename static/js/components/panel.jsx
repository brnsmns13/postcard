/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Panel = require('react-bootstrap/Panel'),
    Card = require('./card.jsx');

var PostCardPanel = React.createClass({
    getInitialState: function() {
        return {data: this.props.data};
    },
    render: function() {
        var cards = {};
        this.state.data.forEach(function(data) {
            cards['card-'+data.id] = <Card text={data.text}/>
        });
        return (
            <div className="col-md-3">
                <Panel header={this.props.title}>
                    {cards}
                </Panel>
            </div>
        );
    }
});

module.exports = PostCardPanel;
