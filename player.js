const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover 
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears
let sRepeat = document.querySelector('#repeat-shuffle'); // element where no-repeat, repeat and shuffle image appears


songIndex = 0;
songs = ['./assets/music/cedbv.mp3', './assets/music/i-trust-u.mp3', './assets/music/dontstartnow.mp3']; // object storing paths for audio objects
thumbnails = ['./assets/images/chillies.png', './assets/images/i-trust-u.png', './assets/images/dontstartnow.png']; // object storing paths for album covers and backgrounds
songArtists = ['Chillies', 'Rxseboy', 'Dua Lipa']; // object storing track artists
songTitles = ["Có em đời bỗng vui", "I trust U", "Don't Start Now"]; // object storing track titles
numSong = songs.length - 1; // number of the playlist

// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;

function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
            thumbnail = document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pause.png"
        thumbnail.style.transform = "scale(1.15)";

        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/play.png"
        thumbnail.style.transform = "scale(1)"

        song.pause();
        playing = true;

    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function() {
    if (mPlay == 1) {
        songIndex--;
    }
    nextSong();
});

//function rs(repeat-shuffle) where mPlay is incremented, element repeat, no-repeat and shuffle changes base on number of mPlay
mPlay = 0;

function repeatShuffler() {
    mPlay++;
    if (mPlay > 2) {
        mPlay = 0;
    };
    if (mPlay == 0) {
        sRepeat.src = "./assets/icons/no-repeat.png"
    } else if (mPlay == 1) {
        sRepeat.src = "./assets/icons/repeat.png"
    } else {
        sRepeat.src = "./assets/icons/shuffle.png"
    }

}
// function where return the random index in number of the song  
perviousNum = NaN;
var shuffleSong = function() {

        var max = numSong;
        max += (!isNaN(perviousNum) ? -1 : 0);
        var value = Math.floor(Math.random() * (max + 1));
        if (value === previousSong) {
            return value = random();
        } else {
            previousSong = value;
            return value;
        }

    }
    // function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track 

function nextSong() {
    if (mPlay == 2) {
        songIndex = shuffleSong();
    } else {
        songIndex++;
        if (songIndex > numSong) {
            songIndex = 0;
        };
    }

    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track 
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = numSong;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
};

function fbClick() {
    window.location = 'https://www.facebook.com/WayciQ'
}

volume = document.getElementById("volume-bar");

function changeVolume() {
    song.volume = this.value;
}