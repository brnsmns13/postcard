/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    Button = require('react-bootstrap/Button'),
    ModalTrigger = require('react-bootstrap/ModalTrigger'),
    CreateCardModal = require('./createCard.jsx'),
    CreatePanelModal = require('./createPanel.jsx'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar');

var Navbar = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
          <div className="header">
                <h2 className="brand"><i className="fa fa-inbox"></i> PostCard: {this.props.email}
                    <ButtonToolbar className="pull-right">
                        <Button bsStyle="warning" href="/generate_user_cards" bsSize="small">Generate Cards</Button>
                    </ButtonToolbar>
                    <ModalTrigger modal={<CreateCardModal/>}>
                        <ButtonToolbar className="pull-right">
                            <Button bsSize="small">Add Card</Button>
                        </ButtonToolbar>
                    </ModalTrigger>
                </h2>
          </div>
      </div>
    );
  }
});

module.exports = Navbar;
