var React = require('react');
var Router = require('react-router');
var ApplicationStore = require('../../stores/ApplicationStore');

function getStateFromStores() {
  return {
    app: ApplicationStore.getCurrent()
  };
}
var Header = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ApplicationStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function() {
    ApplicationStore.removeChangeListener(this._onChange);

  },

    render: function() {
        return (
            <div className="page-header full-content">
                <div className="row">
                    <div className="col-sm-6">
                        <h1>{this.state.app.header} <small>{this.state.app.desc}</small></h1>
                    </div>

                </div>
            </div>
        );
    },

    _onChange: function() {
      this.setState(getStateFromStores());
    }
});

module.exports=Header;
