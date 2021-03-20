/* get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');

/* build our functions */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  let toggleButton = video.paused ? '►' : '❚ ❚';
  toggle.textContent = toggleButton;
}

function skip() {
  let skipAmount = this.dataset.skip;
  video.currentTime += parseFloat(skipAmount);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  let percentPlayed = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percentPlayed}%`;
}

function handleScrub(e) {
  let scrubPercentage = e.offsetX / progress.offsetWidth;
  video.currentTime = parseFloat(scrubPercentage * video.duration);
}

function toggleFullscreen() {
  // check if video is already in fullscreen
  if (!document.fullscreenElement) {
    player.requestFullscreen({ navigationUI: 'show' }).catch((e) => {
      console.error(`Error entering fullscreen: ${e.message}, (${e.name})`);
    });
  } else {
    console.log('trying to exit');
    document.exitFullscreen();
  }
}

/* hook up event listeners*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach((skipButton) => skipButton.addEventListener('click', skip));

ranges.forEach((range) => range.addEventListener('input', handleRangeUpdate));

let isMouseDown = false;
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousemove', (e) => isMouseDown && handleScrub(e));
progress.addEventListener('mouseup', () => isMouseDown = false);
progress.addEventListener('mousedown', () => isMouseDown = true);

fullscreenButton.addEventListener('click', toggleFullscreen);