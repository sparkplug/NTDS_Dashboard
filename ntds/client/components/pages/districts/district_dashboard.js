let React = require('react');
let PageWithNav = require('../page-with-nav2');


class DataView extends React.Component {

    render() {
        let menuItems = [
            { route: '/district_dashboard/districts', text: 'All Districts'},
            { route: '/district_dashboard/view/Kibuku', text: 'Kibuku'},
            { route: '/district_dashboard/view/Yumbe', text: 'Yumbe'},


        ];

        return (
            <PageWithNav menuItems={menuItems} />
    );
    }

}

module.exports = DataView;

