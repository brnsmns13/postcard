/** @jsx React.DOM */
var React = window.React = require('react'),
    Button = require('react-bootstrap/Button'),
    ButtonGroup = require('react-bootstrap/ButtonGroup'),
    ButtonToolbar = require('react-bootstrap/ButtonToolbar'),
    Modal = require('react-bootstrap/Modal'),
    Input = require('react-bootstrap/Input'),
    ListGroupItem = require('react-bootstrap/ListGroupItem'),
    ListGroup = require('react-bootstrap/ListGroup'),
    $ = require('jquery');

var PostCardModal = React.createClass({
    getInitialState: function(){
        return {'reply': false, 'comment': false, 'subject': null, 'content': null, 'data': this.props.data};
    },
    handleSubjectChange: function (event) {
        this.setState({'subject': event.target.value});
    },
    handleBodyChange: function(event) {
        this.setState({'content': event.target.value});
    },
    expandReply: function() {
        this.setState({'reply': true, 'comment':false});
    },
    expandComment: function() {
        this.setState({'comment': true, 'reply': false});
    },
    send: function() {
        if (this.state.reply) {
            $.post("/api/send", {content: this.state.content, to: this.state.data.sender, subject: this.state.subject}, function() {
                this.setState({'reply': false, 'comment': false});
            }, 'post');
        }else {
            $.post("/api/card/comment", {comment: this.state.content, card_id: this.state.data.id}, function() {
                var data = this.state.data;
                data.comments.push(this.state.content);
                this.setState({data: data, 'reply': false, 'comment': false});
            }.bind(this), 'json')
        }
    },
    render: function() {
        var commentThread = {},
            i = 0;
        this.state.data.comments.forEach(function(comment){
            commentThread['comment-' + i] = <ListGroupItem>{comment}</ListGroupItem>
            i+=1;
        });
        return this.transferPropsTo(
            <Modal title={this.state.data.subject} animation={false}>
                <div className="modal-body">
                    <h4>{"From: " + this.state.data.sender}</h4>
                    <p dangerouslySetInnerHTML={{__html: this.state.data.content}}></p>
                </div>
                <ListGroup>
                    {commentThread}
                </ListGroup>
                <div className={this.state.reply ? "" : "hide"}>
                    <form role="form" className={"reply-form"}>
                        <div className={"form-group"}>
                            <label htmlFor="subject-form">Subject: </label>
                            <Input id="subject-form" type="text" className={"form-control"} onChange={this.handleSubjectChange}/>
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor="reply-form">Message Text: </label>
                            <textarea id="reply-form" className={"form-control"} onChange={this.handleBodyChange}/>
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
                <div className={this.state.comment ? "" : "hide"}>
                    <form role="form" className={"reply-form"}>
                        <div className={"form-group"}>
                            <label htmlFor="reply-form">Message Text: </label>
                            <textarea id="reply-form" className={"form-control"} onChange={this.handleBodyChange}/>
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
                            <Button onClick={this.expandComment}>Comment</Button>
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
