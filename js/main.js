/** @jsx React.DOM */

var Board = React.createClass({
    render: function() {
        return (
            <div className="board">
                <h2>Master Title</h2>
                <CardList />
                <CardList />
            </div>
        );
    }
});

var CardList = React.createClass({
    render: function() {
        return (
            <div className="card-list col-md-3">
                <h5>List Title</h5>
                <Card />
                <Card />
                <Card />
            </div>
        );
    }
});

var Card = React.createClass({
    render: function() {
        return(
            <div className="card">
                <h4>Item Title</h4>
                <input type="text" class="form-control input-sm" placeholder="Enter description" />
            </div>
        );
    }
});

React.renderComponent(
    <Board />,
    document.getElementById('content')
);
