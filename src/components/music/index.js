import React, {Fragment} from 'react';

export const Music = () => (
    <Fragment>
        <h1 className="title">Music</h1>
        <div className="columns">
            <div className="column is-4">
                <section id={'library'}>
                    library
                </section>
            </div>
            <div className="column is-4">
                <section id={'playlist'}>
                    playlist
                </section>
            </div>
        </div>
    </Fragment>
);
