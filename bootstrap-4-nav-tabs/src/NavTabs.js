import React from 'react';

export default class NavTabs extends React.Component {

    constructor(props) {
        super(props);
        let state = {};
        Object.keys(this.props.items).forEach((item, index) => {
            state[item] = index === 0;
        });
        this.state = state;
        this.tabClick = this.tabClick.bind(this);
    }

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