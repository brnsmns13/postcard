/** @jsx React.DOM */
var React = window.React = require('react'),
    Button = require('react-bootstrap/Button'),
    ButtonGroup = require('react-bootstrap/ButtonGroup'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
    Modal = require('react-bootstrap/Modal'),
    Input = require('react-bootstrap/Input');
var PostCardModal = React.createClass({
    getInitialState: function(){
        return {'action': null};
    },
    expandReply: function() {
        this.setState({'action': 'reply'});
    },
    sendReply: function() {
        this.setState({'action': null});
    },
    render: function() {
        var action = false;
        console.log(this.state.action);
        if (this.state.action === 'reply') {
            action = true;
        }
        return this.transferPropsTo(
            <Modal title={this.props.data.subject} animation={false}>
                <div className="modal-body">
                    <h4>{"From: " + this.props.data.sender}</h4>
                    <p dangerouslySetInnerHTML={{__html: this.props.data.content}}></p>
                </div>
                <div className={action ? "" : "hide"}>
                    <form role="form" className={"reply-form"}>
                        <div className={"form-group"}>
                            <label htmlFor="subject-form">Subject: </label>
                            <input id="subject-form" className={"form-control"} value={"Re: " + this.props.data.subject}/>
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor="reply-form">Reply Text:</label>
                            <textarea id="reply-form" className={"form-control"} />
                        </div>
                        <div className={"form-group"}>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button bsStyle="primary" onClick={this.sendReply}>Send</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={this.expandReply}>Reply To Sender</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button onClick={this.props.onRequestHide}>Comment</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button onClick={this.props.onRequestHide}>Archieve</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button onClick={this.props.onRequestHide}>Close</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
            </Modal>
        );
    }
});

module.exports = PostCardModal;
