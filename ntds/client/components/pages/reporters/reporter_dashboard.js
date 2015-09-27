let React = require('react');
let PageWithNav = require('../page-with-nav');
let PageWithNav2 = require('../page-with-nav2');


class Recruitment extends React.Component {

    render() {
        let menuItems = [
            { route: 'messages', text: 'Messages'},
            { route: 'reporters', text: 'All Reporters'},


        ];
        

        return (
            <PageWithNav menuItems={menuItems} />
    );
    }

}

module.exports = Recruitment;