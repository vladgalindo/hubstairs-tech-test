import React, {Fragment} from 'react';
import {menuItems} from '../menu-items';

export const Dashboard = (props) => {

    const goToUrl = (url) => {
        props.history.push(url);
    }

    return (
        <Fragment>
            {
                menuItems.map(item => (
                    <section key={item.label} className={`hero is-${item.color}`} onClick={() => {goToUrl(item.url)}}>
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    {item.label}
                                </h1>
                                <h2 className="subtitle">
                                    {item.info}
                                </h2>
                            </div>
                        </div>
                    </section>
                ))
            }

        </Fragment>
    )
}
