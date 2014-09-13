/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Button = require('react-bootstrap/Button'),
    ModalTrigger = require('react-bootstrap/ModalTrigger'),
    PostCardModal = require('./cardview.jsx');

var Card = React.createClass({
  render: function() {
    return (
        <ModalTrigger modal={<PostCardModal/>}>
            <Button className="post-card" bsSize="large">{this.props.text}</Button>
        </ModalTrigger>
    );
  }
});

module.exports = Card;
