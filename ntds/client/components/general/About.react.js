var React = require('react');
var Router = require('react-router');
var FixedDataTable = require('fixed-data-table');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

let FullWidthSection = require('../full-width-section');



function rowGetter(rowIndex) {
    return rows[rowIndex];
}
var About = React.createClass({
    contextTypes: {
        muiTheme: React.PropTypes.object
},


  getInitialState: function () {
    return {

    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({

    });
  },

  componentWillMount: function () {

  },



  render: function () {




      return (
    <FullWidthSection>

         

            </FullWidthSection>

      );



  }
});

module.exports =About;
