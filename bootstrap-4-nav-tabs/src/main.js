import React from 'react';
import NavTabs from './NavTabs';

export default class Main extends React.Component {

    render() {

        let items = {
            "color": {
                title: "Color",
                content: <div>Hello Color Tab</div>
            },
            "tiles": {
                title: "Tiles",
                content: <div>Hello Tiles Tab</div>
            },
            "clock": {
                title: "Clock",
                content: <div>Hello Clock Tab</div>
            }
        }

        return <div>
            <NavTabs
                items={items}
            />
        </div >;

    }
}