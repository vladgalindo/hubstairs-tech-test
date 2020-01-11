import React, {Fragment} from 'react';
import PropTypes from 'prop-types';


export const AppMenu = (props) => (
    <Fragment>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="mainUrls" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item" href="/">
                        Dashboard
                    </a>
                    {
                        props.menuItems.map(item => (
                            <a key={item.url} className="navbar-item" href={item.url}>
                                {item.label}
                            </a>
                        ))
                    }
                </div>

            </div>
        </nav>
    </Fragment>
);

AppMenu.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string,
        info: PropTypes.string,
        color: PropTypes.string
    }))
}
