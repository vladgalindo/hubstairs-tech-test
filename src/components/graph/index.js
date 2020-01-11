import React, {Fragment} from 'react';

export const Graph = () => (
    <Fragment>
        <h1 className="title">Graph</h1>
        <div className="columns">
            <div className="column is-3">
                Load an csv file to render the Chart...
                <section>
                    form...
                </section>
            </div>
            <div className="column is-8">
                <section id={'playlist'}>
                    chart...
                </section>
            </div>
        </div>
    </Fragment>
);
