import React from 'react';

export default class NavTabs extends React.Component {

    /**
     * Initializing state with available items keys. True for first index rest are false.
     * @param {Object} props
     */
    constructor(props) {
        super(props);
        let state = {};
        Object.keys(this.props.items).forEach((item, index) => {
            state[item] = index === 0;
        });
        this.state = state;
        this.tabClick = this.tabClick.bind(this);
    }

    /**
     * changing the tab click to active and making rest tabs inactive.If calling component wants event object then passing back.
     * @param {Object} event
     */
    tabClick(event) {
        event.persist();
        let state = this.state;
        Object.keys(state).map(stateItems => {
            if (state[stateItems]) {
                state[stateItems] = false;
                return;
            }
        });
        state[event.target.id] = true;
        this.setState({
            ...state
        }, () => {
            if (this.props.handleTabClick) {
                this.props.handleTabClick(event);
            }
        });
    }


    /**
     * rendering the ul li list for available items and also adding tab-content properties for each item.
     */
    render() {

        let itemLiList = Object.keys(this.props.items);

        return <span>
            <ul className={this.props.navClass} onClick={this.tabClick}>
                {
                    itemLiList.map(item => {
                        return <li
                            key={`liKeyForNavTabs${item}`}
                            className="nav-item"
                        >
                            <a
                                className={"nav-link" + (this.state[item] ? " active" : "")}
                                id={item}
                            >
                                {this.props.items[item].title}
                            </a>
                        </li>
                    })
                }
            </ul>
            <div className="tab-content">
                {
                    itemLiList.map(item => {
                        return <div
                            key={`tabContentDivfor${item}`}
                            className={"tab-pane container " + (this.state[item] ? "active" : "fade")}
                            id={`tab-content-${items}`}
                        >
                            {this.props.items[item].content}
                        </div>;
                    })
                }
            </div>
        </span>;
    }
}

NavTabs.defaultProps = {
    navClass: "nav nav-tabs"
};