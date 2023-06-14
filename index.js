const videoPlayer = videojs('videojs');

document.addEventListener('DOMContentLoaded', function () {
  const urlInput = document.getElementById('urlInput');
  const urlLoadButton = document.getElementById('urlLoadButton');

  urlLoadButton.addEventListener('click', function () {
    const videoUrl = urlInput.value;
    const videoType = 'application/x-mpegURL'; // Change the video type if necessary

    // Remove existing sources
    videoPlayer.pause();
    videoPlayer.src('');
    videoPlayer.poster('');

    // Add new source
    videoPlayer.src({
      src: videoUrl,
      type: videoType,
    });
    
    videoPlayer.hlsQualitySelector();

    let qualityLevels = videoPlayer.qualityLevels();

    qualityLevels.on('addqualitylevel', function (event) {
      let qualityLevel = event.qualityLevel;
      if (qualityLevel.height) {
        qualityLevel.enabled = true;
      } else {
        qualityLevels.removeQualityLevel(qualityLevel);
        qualityLevel.enabled = false;
      }
    });
    videoPlayer.load();
    videoPlayer.play();
  });
});
