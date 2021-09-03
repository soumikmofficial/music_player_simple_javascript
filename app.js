const audio = document.querySelector(".audio");
const title = document.querySelector(".title");
const cover = document.querySelector(".cover");
const prev = document.querySelector(".prev");
const play = document.querySelector(".play-icon");
const next = document.querySelector(".next");
const mainContainer = document.querySelector(".container");
const progress = document.querySelector(".progress-wrapper");
const progress_container = document.querySelector(".progress");

let songs = ["Exist For Love", "Dark Matter", "It Happened Quiet"];

let songIndex = 0;

let loadSong = (index) => {
  title.innerText = songs[index];
  cover.src = `./assets/${songs[index]}.jpg`;
  audio.src = `./assets/${songs[index]}.mp3`;
};
let changeIcon = () => {
  play.classList.toggle("fa-play-circle");
  play.classList.toggle("fa-pause-circle");
};
let playSong = () => {
  audio.play();
  mainContainer.classList.add("play");
  changeIcon();
};
let pauseSong = () => {
  audio.pause();
  mainContainer.classList.remove("play");
  changeIcon();
};

let prevSong = () => {
  if (songIndex > 0) {
    songIndex -= 1;
  } else {
    songIndex = songs.length - 1;
  }
  loadSong(songIndex);
  playSong();
};

let nextSong = () => {
  if (songIndex < songs.length - 1) {
    songIndex += 1;
  } else {
    songIndex = 0;
  }
  loadSong(songIndex);
  playSong();
};

let updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  console.log(progressPercent);
  progress.style.width = `${progressPercent}%`;
};

let selectProgress = (e) => {
  const width = progress_container.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
  console.log(currentTime);
};

loadSong(songIndex);

play.addEventListener("click", () => {
  let isPlaying = mainContainer.classList.contains("play");

  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

prev.addEventListener("click", prevSong);

next.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progress_container.addEventListener("click", selectProgress);

audio.addEventListener("ended", nextSong);
