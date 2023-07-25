var player;

function onYouTubeIframeAPIReady() {
  document.getElementById('start-btn').addEventListener('click', function () {
    var videoLink = document.getElementById('video-link').value.trim();
    var videoId = extractVideoId(videoLink);
    if (videoId) {
      loadYouTubeVideo(videoId);
    } else {
      alert('Invalid YouTube video link');
    }
  });
}

function extractVideoId(link) {
  var regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = link.match(regExp);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

function loadYouTubeVideo(videoId) {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: videoId,
    playerVars: {
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      autoplay: 0,
      rel: 0,
      showinfo: 0,
      modestbranding: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  // Video will start playing automatically after loading
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  } else {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}