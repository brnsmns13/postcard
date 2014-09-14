/** @jsx React.DOM */
var React = window.React = require('react'),
    Button = require('react-bootstrap/Button'),
    ButtonGroup = require('react-bootstrap/ButtonGroup'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
    Modal = require('react-bootstrap/Modal'),
    Input = require('react-bootstrap/Input'),
    $ = require('jquery');
var PostCardModal = React.createClass({
    getInitialState: function(){
        return {'reply': false, 'comment': false, 'subject': null, 'content': null};
    },
    handleSubjectChange: function (event) {
        this.setState({'subject': event.target.value});
    },
    handleBodyChange: function(event) {
        this.setState({'content': event.target.value});
    },
    expandReply: function() {
        this.setState({'reply': true});
    },
    expandComment: function() {
        this.setState({'comment': true});
    },
    send: function() {
        if (this.state.reply) {
            $.post("/api/send", {content: this.state.content, to: this.props.data.sender, subject: this.state.subject}, 'post');
        }
        this.setState({'reply': false, 'comment': true});
    },
    render: function() {
        var form = false;
        if (this.state.reply || this.state.comment) {
            form = true;
        }
        return this.transferPropsTo(
            <Modal title={this.props.data.subject} animation={false}>
                <div className="modal-body">
                    <h4>{"From: " + this.props.data.sender}</h4>
                    <p dangerouslySetInnerHTML={{__html: this.props.data.content}}></p>
                </div>
                <div className={form ? "" : "hide"}>
                    <form role="form" className={"reply-form"}>
                        <div className={"form-group"}>
                            <label htmlFor="subject-form">Subject: </label>
                            <Input id="subject-form" type="text" className={"form-control"} onChange={this.handleSubjectChange}/>
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor="reply-form">Reply Text: </label>
                            <Input id="reply-form" type="text-area" className={"form-control"} onChange={this.handleBodyChange}/>
                        </div>
                        <div className={"form-group"}>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <Button bsStyle="primary" onClick={this.send}>Send</Button>
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
