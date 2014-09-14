/** @jsx React.DOM */
var React = window.React = require('react'),
    Button = require('react-bootstrap/Button'),
    DropdownButton = require('react-bootstrap/DropdownButton'),
    MenuItem = require('react-bootstrap/MenuItem'),
    ButtonGroup = require('react-bootstrap/ButtonGroup'),
    Modal = require('react-bootstrap/Modal');
var PostCardModal = React.createClass({
  render: function() {
      console.log(this.props.data);
    return this.transferPropsTo(
        <Modal title={this.props.data.subject} animation={false}>
            <div className="modal-body">
                <h4></h4>
                <p dangerouslySetInnerHTML={{__html: this.props.data.content}}></p>
            </div>
            <div className="modal-footer">
                <ButtonGroup>
                    <DropdownButton title="Action">
                        <MenuItem key="1">Reply To Sender</MenuItem>
                        <MenuItem key="2">Comment</MenuItem>
                    </DropdownButton>
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                </ButtonGroup>
            </div>
        </Modal>
      );
  }
});

module.exports = PostCardModal;
