import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaHeart, FaVolumeUp } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Default duration (3 minutes)
  
  const audioRef = useRef(null); // Audio element ref

  const songs = [
    { id: 1, title: "Aye Sinamika", artist: "Artist One", url: "/songs/Aye_Sinamika.mp3" },
    { id: 2, title: "Maula Sallim", artist: "Artist Two", url: "/songs/Maula_Sallim.mp3" },
    { id: 3, title: "Naane Varugiren", artist: "Artist Three", url: "/songs/Naane_Varugiren.mp3" },
  ];

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentTime(0);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentTime(0);
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  // Sync current time with audio progress
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Set duration when song changes
    const updateDuration = () => {
      setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, [currentSongIndex]); // Runs whenever the song changes

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]); // Update volume when it changes

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div style={styles.container}>
      {/* Your Playlists */}
      <div style={styles.suggestedPlaylists}>
        <h2 style={styles.heading}>Your Playlists</h2>
        <div style={styles.grid}>
          {songs.map((song) => (
            <div style={styles.playlistCard} key={song.id}>
              <div style={styles.songDetails}>
                <span>{song.title}</span>
                <span>{song.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Music Player */}
      <div style={styles.musicPlayer}>
        <div style={styles.musicPlayerCard}>
          <h3 style={styles.songTitle}>{songs[currentSongIndex].title}</h3>
          <p style={styles.songArtist}>{songs[currentSongIndex].artist}</p>

          {/* Audio Element */}
          <audio ref={audioRef} src={songs[currentSongIndex].url} />

          {/* Seek Bar */}
          <div style={styles.seekBarContainer}>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => {
                setCurrentTime(e.target.value);
                const audio = audioRef.current;
                if (audio) {
                  audio.currentTime = e.target.value;
                }
              }}
              style={styles.seekBar}
            />
            <div style={styles.timeDisplay}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div style={styles.controlButtons}>
            <button onClick={handlePrevious} style={styles.controlButton}>
              <FaStepBackward />
            </button>
            <button onClick={togglePlayPause} style={styles.playPauseButton}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleNext} style={styles.controlButton}>
              <FaStepForward />
            </button>
          </div>

          {/* Player Features */}
          <div style={styles.playerFeatures}>
            <FaHeart
              style={{ ...styles.icon, color: liked ? "red" : "white" }}
              onClick={toggleLike}
              title="Like"
            />
            <AiOutlineStar
              style={{ ...styles.icon, color: favorited ? "gold" : "white" }}
              onClick={toggleFavorite}
              title="Add to Favorites"
            />
            <div style={styles.volumeControl}>
              <FaVolumeUp style={styles.icon} />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                style={styles.volumeBar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#121212",
    height: "80vh",
    color: "white",
  },
  suggestedPlaylists: {
    width: "25%",
    backgroundColor: "#181818",
    padding: "10px",
    borderRadius: "8px",
  },
  heading: {
    fontSize: "1.5em",
    marginBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
  },
  playlistCard: {
    padding: "10px",
    backgroundColor: "#252525",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songDetails: {
    display: "flex",
    flexDirection: "column",
    color: "#d3d3d3",
  },
  musicPlayer: {
    width: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  musicPlayerCard: {
    backgroundColor: "#1DB954",
    padding: "30px",
    borderRadius: "20px",
    width: "50%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
  },
  songTitle: {
    fontSize: "2em",
    fontWeight: "bold",
    margin: "10px 0",
  },
  songArtist: {
    fontSize: "1.2em",
    marginBottom: "20px",
  },
  seekBarContainer: {
    marginBottom: "20px",
  },
  seekBar: {
    width: "100%",
  },
  timeDisplay: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9em",
  },
  controlButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  controlButton: {
    backgroundColor: "#121212",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.5em",
  },
  playPauseButton: {
    backgroundColor: "white",
    color: "#1DB954",
    border: "none",
    padding: "12px 20px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "2em",
  },
  playerFeatures: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
  },
  icon: {
    fontSize: "1.8em",
    cursor: "pointer",
  },
  volumeControl: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  volumeBar: {
    width: "80px",
  },
};

export default Home;
