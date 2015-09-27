let React = require('react');


class Dashboard extends React.Component {

    render() {
        let menuItems = [
            { route: 'about', text: 'About'},

        ];

        return (
            <PageNav menuItems={menuItems} />
    );
    }

}

module.exports = Dashboard;