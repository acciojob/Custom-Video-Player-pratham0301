const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Toggle video playback
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

// Update play/pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip video (forward/backward)
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle volume and playback rate changes
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

// Scrub (seek via progress bar)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Graceful error handling if video fails to load
video.addEventListener('error', () => {
  const errorMsg = document.createElement('div');
  errorMsg.textContent = 'Video failed to load.';
  errorMsg.style.position = 'absolute';
  errorMsg.style.top = '50%';
  errorMsg.style.left = '50%';
  errorMsg.style.transform = 'translate(-50%, -50%)';
  errorMsg.style.background = 'rgba(0,0,0,0.7)';
  errorMsg.style.color = 'white';
  errorMsg.style.padding = '1em 2em';
  errorMsg.style.zIndex = 1;
  player.appendChild(errorMsg);
});

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => {
  range.addEventListener('input', handleRangeUpdate);
  range.addEventListener('change', handleRangeUpdate);
});

// Scrubbing
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);