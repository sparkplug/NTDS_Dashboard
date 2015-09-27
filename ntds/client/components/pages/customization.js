let React = require('react');
let PageWithNav = require('./page-with-nav');


class Customization extends React.Component {

  render() {
    let menuItems = [
      { route: 'about', text: 'About'},

    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }

}

module.exports = Customization;
