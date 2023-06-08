import React from 'react';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1
    };
  }

  componentDidMount() {
    const audio = this.audioRef.current;
    audio.addEventListener('timeupdate', this.handleTimeUpdate);
    audio.addEventListener('durationchange', this.handleDurationChange);
  }

  componentWillUnmount() {
    const audio = this.audioRef.current;
    audio.removeEventListener('timeupdate', this.handleTimeUpdate);
    audio.removeEventListener('durationchange', this.handleDurationChange);
  }

  handlePlay = () => {
    const audio = this.audioRef.current;
    if (this.state.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.setState(prevState => ({ isPlaying: !prevState.isPlaying }));
  }

  handlePause = () => {
    const audio = this.audioRef.current;
    audio.pause();
    this.setState({ isPlaying: false });
  }

  handleStop = () => {
    const audio = this.audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    this.setState({ isPlaying: false, currentTime: 0 });
  }

  handleTimeUpdate = () => {
    const audio = this.audioRef.current;
    this.setState({ currentTime: audio.currentTime });
  }

  handleDurationChange = () => {
    const audio = this.audioRef.current;
    this.setState({ duration: audio.duration });
  }

  handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    const audio = this.audioRef.current;
    audio.volume = volume;
    this.setState({ volume });
  }

  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  render() {
    const { isPlaying, currentTime, duration, volume } = this.state;

    return (
      <div className="audio">
        <audio className="audio-file" ref={this.audioRef}>
          <source src="../audio/night-in-kyoto-avbe.mp3" type="audio/mpeg" />
          Votre navigateur ne prend pas en charge la lecture audio.
        </audio>

        <div className="audio-element-cont">
          {isPlaying ? (
            <button className="audio-pause" id="audio-pause" onClick={this.handlePause}>
              <i className="fa-solid fa-pause"></i>
              {/* beats */}
              <img src="../img/avbe.jpg" alt="" className="audio-image" />
            </button>
          ) : (
            <button className="audio-play" id="audio-play" onClick={this.handlePlay}>
              <i className="fa-solid fa-play"></i>
              {/* beats */}
              <img src="../img/avbe.jpg" alt="" className="audio-image" />
            </button>
          )}

          <input type="range" className="audio-timer" min="0" max={duration} value={currentTime} step=".00001" />

          <div className="audio-element">
            <h4>Night in kyoto</h4>
            <h5>AVBE</h5>

            <div className="duration-container">
              <button className="audio-stop" id="audio-stop" onClick={this.handleStop}>
                <i className="fa-solid fa-stop"></i>
              </button>

              <div className="audio-volume-container">
                <button className="audio-off" id="audio-off">
                  <i className="fa-solid fa-volume-high"></i>
                </button>

                <div style={{ display: 'flex' }}>
                  <input
                    type="range"
                    className="audio-volume"
                    min="0"
                    max="1"
                    step=".1"
                    value={volume}
                    onChange={this.handleVolumeChange}
                  />
                  <div className="audio-volume-slider"></div>
                </div>
              </div>

              <div className="audio-duration">
                <span className="duration-time">{this.formatTime(currentTime)}</span>
                <span>/</span>
                <span className="duration">{this.formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
