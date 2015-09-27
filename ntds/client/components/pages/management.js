let React = require('react');
let PageWithNav = require('./page-with-nav');


class management extends React.Component {

    render() {
        let menuItems = [
            { route: 'biodata', text: 'BioData'},
            { route: 'certification', text: 'Certifications'},
            { route: 'agreements', text: 'Agreements'},
            { route: 'questionaires', text: 'Questionaires'},
            { route: 'performance_review', text: 'Performance Review'},


        ];

        return (
            <PageWithNav menuItems={menuItems} />
    );
    }

}

module.exports = management;