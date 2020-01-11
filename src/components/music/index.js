import React, {Fragment,useEffect, useState, useRef} from 'react';
import {library as musicLibrary} from '../../audio-files/library';

export const Music = () => {

    const [currentSong, setCurrentSong] = useState('audio-files/DoNotDisturb.mp3');
    const [currentPlaylist, setCurrentPlaylist] = useState([]);

    const [library] = useState(musicLibrary);
    const audioSrcRef = useRef();

    const SONG_TITLE_CLASS = {marginRight: '10px'};

    useEffect(() => {
        const player = audioSrcRef.current;
        player.addEventListener('canplay', __handleSongPlay);
        player.addEventListener('ended', __handleSongEnd);
        return () => {
            player.removeEventListener('canplay', __handleSongPlay);
            player.removeEventListener('ended', __handleSongEnd);
        }
    });

    const __findSong = (collection, path) => collection.findIndex(song => song.path === path);

    const __handleSongPlay = event => event.target.play();

    const __handleSongEnd = function(event) {
        setCurrentPlaylist(prevState => {
            const endedSongPath = event.target.attributes.src.value;
            const currentSongIdx = __findSong(prevState, endedSongPath);

            if (currentSongIdx < prevState.length - 1) {
                audioSrcRef.current.src = prevState[currentSongIdx + 1].path;
            } else {
                audioSrcRef.current.src = null;
            }
            const filteredPlaylist = prevState.filter(song => song.path !== endedSongPath);

            return [...filteredPlaylist];
        })
    };

    const playSong = (song) => {
        setCurrentSong(song.path);
        audioSrcRef.current.src = currentSong;
        audioSrcRef.current.currentTime = 0;

        if(__findSong(currentPlaylist, song.path) === -1) {
            setCurrentPlaylist([song, ...currentPlaylist])
        } else {
            const songIdx = __findSong(currentPlaylist, song.path);
            let playlist = [...currentPlaylist];
            playlist.splice(songIdx, 1);
            setCurrentPlaylist([song, ...playlist])
        }
    };

    const removeSong = function(song) {
        if (audioSrcRef.current.attributes.src.value === song.path) {
            audioSrcRef.current.src = null;
        }
        const filteredPlaylist = currentPlaylist.filter(s => s.path !== song.path);
        if (filteredPlaylist.length > 0) {
            audioSrcRef.current.src = filteredPlaylist[0].path;
        }
        setCurrentPlaylist([...filteredPlaylist]);
    };

    const renderLibrary = () => (

        library.map(song => (
            <Fragment key={song.title}>
                <a className="panel-block">
                            <span className="panel-icon">
                              <i className="fas fa-music" aria-hidden="true"></i>
                            </span>
                    <span style={SONG_TITLE_CLASS}>{song.title}</span>
                    <span className="panel-icon" onClick={() => playSong(song)}>
                              <i className="fas fa-play" aria-hidden="true"></i>
                            </span>
                </a>
            </Fragment>
        ))
    );

    const renderPlaylist = () => (
        <ul>
            {
                currentPlaylist.map(song => (
                    <Fragment key={song.title}>
                        <a className="panel-block">
                            <span className="panel-icon">
                              <i className="fas fa-music" aria-hidden="true"></i>
                            </span>
                            <span style={SONG_TITLE_CLASS}>{song.title}</span>
                            <span className="panel-icon" onClick={() => playSong(song)}>
                              <i className="fas fa-play" aria-hidden="true"></i>
                            </span>
                            <span className="panel-icon" onClick={() => removeSong(song)}>
                              <i className="fas fa-trash-alt" aria-hidden="true"></i>
                            </span>
                        </a>
                    </Fragment>
                ))
            }
        </ul>
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
                        <audio
                            id="player"
                            volume='0.1'
                            style={{width: '100%'}}
                            controls src={currentSong} ref={audioSrcRef}>
                            Your browser does not support the
                            <code>audio</code> element.
                        </audio>
                        <nav className="panel">
                            <p className="panel-heading">
                                Playlist
                            </p>
                            {renderPlaylist()}
                        </nav>
                    </section>
                </div>
            </div>
        </Fragment>
    )
};
