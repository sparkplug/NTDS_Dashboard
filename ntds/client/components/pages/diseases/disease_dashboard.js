let React = require('react');
let PageWithNav = require('../page-with-nav2');


class DataView extends React.Component {

    render() {
        let menuItems = [
            { route: '/disease_dashboard/diseases', text: 'All Diseases'},
            { route: '/disease_dashboard/view/helminthiasis', text: 'Helminthiasis'},
             { route: '/disease_dashboard/view/trachoma', text: 'Trachoma'},
               { route: '/disease_dashboard/view/onchocerciasis', text: 'Onchocerciasis'},
               { route: '/disease_dashboard/view/schistosomiasis', text: 'Schistosomiasis'},
                { route: '/disease_dashboard/view/lymphatic', text: 'Lymphatic'},
            { route: '/disease_dashboard/view/filariasis', text: 'Filariasis'},


        ];

        return (
            <PageWithNav menuItems={menuItems} />
    );
    }

}

module.exports = DataView;

