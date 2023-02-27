window.addEventListener("load", function () {
  setTimeout(
    function open(event) {
      document.querySelector(".popup").style.display = "block";
      document.querySelector('.popup_end').style.display = "none";
      document.querySelector('.popup_level').style.display = "none";
      document.querySelector('.container').style.filter = "blur(2px) opacity(0.8) brightness(0.5) drop-shadow(0 0 1rem black)";
    },
    1000
  )
});
document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
  gameManager.start = true;
  console.log("play");
  soundManager.init();
  soundManager.loadArray(["assets/sounds/chomp_2.wav", "assets/sounds/dead.mp3","assets/sounds/beginning.wav","assets/sounds/hurt.mp3", "assets/sounds/ding.mp3", "assets/sounds/chomp.wav", "assets/sounds/eatfruit.wav"]);
  soundManager.play("assets/sounds/beginning.wav", {looping: false, volume: 0.2});
  soundManager.play("assets/sounds/chomp.wav", {looping: true, volume: 0.1});
  document.querySelector('.container').style.filter = "none";
  document.querySelector('.canvasContainer').style.filter = "blur(0.7px) opacity(0.9) brightness(0.9) drop-shadow(0 0 0.1rem black)";
  gameManager.play();
  gameManager.player.sprite_right.start();
});
document.querySelector("#close_level").addEventListener("click", function () {
  document.querySelector(".popup_level").style.display = "none";
  gameManager.start = true;
  console.log("play level");
  soundManager.loadArray(["assets/sounds/chomp_2.wav", "assets/sounds/dead.mp3","assets/sounds/beginning.wav","assets/sounds/hurt.mp3", "assets/sounds/ding.mp3", "assets/sounds/chomp.wav", "assets/sounds/eatfruit.wav"]);
  soundManager.play("assets/sounds/chomp.wav", {looping: true, volume: 0.1});
  gameManager.play();
  gameManager.player.stopAllSprites(null);
  gameManager.player.sprite_right.start();
  document.querySelector('.container').style.filter = "none";
});
document.querySelector(".speaker").addEventListener('click', function(e) {
  e.preventDefault();
  soundManager.toggleMute();
  $(this).toggleClass('mute');
})
// $('.speaker').click(function(e) {
//   e.preventDefault();
//   soundManager.toggleMute();
//   $(this).toggleClass('mute');
// });

