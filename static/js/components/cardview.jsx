/** @jsx React.DOM */
var React = window.React = require('react'),
    Button = require('react-bootstrap/Button'),
    Modal = require('react-bootstrap/Modal');
var PostCardModal = React.createClass({
  render: function() {
    return this.transferPropsTo(
        <Modal title="Modal heading" animation={false}>
          <div className="modal-body">
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>TODO</p>

            <h4>Tooltips in a modal</h4>
            <p>TODO</p>
          </div>
          <div className="modal-footer">
            <Button onClick={this.props.onRequestHide}>Close</Button>
          </div>
        </Modal>
      );
  }
});

module.exports = PostCardModal;
