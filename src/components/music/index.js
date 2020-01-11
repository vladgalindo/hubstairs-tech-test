import React, {Fragment, useState} from 'react';
import {library as musicLibrary} from '../../audio-files/library';

export const Music = () => {

    const [library] = useState(musicLibrary);
    const SONG_TITLE_CLASS = {marginRight: '10px'};

    const renderLibrary = () => (

        library.map(song => (
            <Fragment key={song.title}>
                <a className="panel-block">
                            <span className="panel-icon">
                              <i className="fas fa-music" aria-hidden="true"></i>
                            </span>
                    <span style={SONG_TITLE_CLASS}>{song.title}</span>
                    <span className="panel-icon" >
                              <i className="fas fa-play" aria-hidden="true"></i>
                            </span>
                </a>
            </Fragment>
        ))
    );

    return (
        <Fragment>
            <h1 className="title">Music</h1>
            <div className="columns">
                <div className="column is-4">
                    <section id={'library'}>
                        <nav className="panel">
                            <p className="panel-heading">
                                Library
                            </p>
                            {renderLibrary()}
                        </nav>
                    </section>
                </div>
                <div className="column is-4">
                    <section id={'playlist'}>
                        playlist
                    </section>
                </div>
            </div>
        </Fragment>
    )
};
