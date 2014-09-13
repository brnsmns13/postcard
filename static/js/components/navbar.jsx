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
                <h2 className="brand">PostCard
                    <ModalTrigger modal={<CreatePanelModal/>}>
                        <ButtonToolbar className="pull-right">
                            <Button bsSize="small">Add Panel</Button>
                        </ButtonToolbar>
                    </ModalTrigger>
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
