/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Button = require('react-bootstrap/Button'),
    ModalTrigger = require('react-bootstrap/ModalTrigger'),
    PostCardModal = require('./cardview.jsx');

var Card = React.createClass({
    drag: function(ev) {
        ev.dataTransfer.setData("draggedItem", JSON.stringify(this.props.item));
        ev.dataTransfer.setData("sourcePanel", JSON.stringify(this.props.panel));
    },
    render: function() {
        return (
            <div draggable="true" onDragStart={this.drag}>
                <ModalTrigger modal={<PostCardModal/>}>
                    <Button className="post-card" bsSize="large">{this.props.item.subject}</Button>
                </ModalTrigger>
            </div>
        );
    }
});

module.exports = Card;
