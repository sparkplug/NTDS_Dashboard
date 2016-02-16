let React = require('react');
let PageWithNav = require('../page-with-nav2');


class DataView extends React.Component {

    render() {
        let menuItems = [
            { route: '/disease_dashboard/diseases', text: 'All Diseases'},
            { route: '/disease_dashboard/view/Helminthiasis', text: 'Helminthiasis'},
             { route: '/disease_dashboard/view/Trachoma', text: 'Trachoma'},
               { route: '/disease_dashboard/view/Onchocerciasis', text: 'Onchocerciasis'},
               { route: '/disease_dashboard/view/Schistosomiasis', text: 'Schistosomiasis'},

            { route: '/disease_dashboard/view/Lymphatic', text: 'Lymphatic'},


        ];

        return (
            <PageWithNav menuItems={menuItems} />
    );
    }

}

module.exports = DataView;

