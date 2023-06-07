// Sélectionnez les éléments du carousel
window.addEventListener("DOMContentLoaded" , function(){

    const carousel = document.querySelector('.carousel');
const slides = carousel.querySelectorAll('.slide');
const prevButton = document.getElementById('btn-right');
const nextButton = document.getElementById('btn-left');
let currentIndex = 0;

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  carousel.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
}

function goToPrevSlide() {
  goToSlide(currentIndex - 1);
}

function goToNextSlide() {
  goToSlide(currentIndex + 1);
}

prevButton.addEventListener('click', goToPrevSlide);
nextButton.addEventListener('click', goToNextSlide);
window.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft') {
    goToPrevSlide();
  } else if (event.key === 'ArrowRight') {
    goToNextSlide();
  }
});


  // Récupérer les éléments audio
const audioElements = document.querySelectorAll('.audio-file');

// Parcourir chaque élément audio
audioElements.forEach(function(audio) {
  // Récupérer les éléments associés
  const timerSlider = audio.nextElementSibling.querySelector('.audio-timer');
  const playButton = audio.nextElementSibling.querySelector('.audio-play');
  const pauseButton = audio.nextElementSibling.querySelector('.audio-pause');
  const stopButton = audio.nextElementSibling.querySelector('.audio-stop');
  const volumeSlider = audio.nextElementSibling.querySelector('.audio-volume');
  const volumeOff = audio.nextElementSibling.querySelector('.audio-off');
  const time = audio.nextElementSibling.querySelector('.audio-duration .duration');
  const now = audio.nextElementSibling.querySelector('.audio-duration .duration-time');
  // const volume = audio.nextElementSibling.querySelector('.audio-speaker');
  console.log(time);
  let wait =true;

  
  function buildDuration(duration){
    let minutes = Math.floor(duration / 60);
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2,"0");
    return minutes + ":" +secondes;
  }
  time.textContent = buildDuration(audio.duration);
  audio.addEventListener('loadedmetadata', function() {
    const duration = audio.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedDuration = `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
  
    time.textContent = formattedDuration;
  });

  pauseButton.style.display = "none"
  stopButton.style.display = "none"
  console.log("off "+volumeOff);
  let vol = audio.volume;
  // Événement de lecture
  playButton.addEventListener('click', function() {
    audio.play();
    this.style.display ="none"
    pauseButton.style.display = "inline"
    // stopButton.style.display = "inline"
    timerSlider.style.setProperty("--scale-x2", audio.currentTime/audio.duration);
  });

  // Événement de pause
  pauseButton.addEventListener('click', function() {
    audio.pause();
    this.style.display ="none"
    playButton.style.display = "inline"
  });

  // Événement d'arrêt
  stopButton.addEventListener('click', function() {
    audio.pause();
    audio.currentTime = 0;
    this.style.display ="none"
    pauseButton.style.display = "none"
    playButton.style.display = "inline"
});

  // Événement de réglage du volume
  volumeSlider.addEventListener('input', function() {
    audio.volume = volumeSlider.value;
    vol = audio.volume;
    if(audio.volume == 0){
      volumeOff.firstElementChild.classList.remove("fa-volume-xmark");
      volumeOff.firstElementChild.classList.add("fa-volume-high");
    }else{
      volumeOff.firstElementChild.classList.add("fa-volume-xmark");
      volumeOff.firstElementChild.classList.remove("fa-volume-high");
    }   
    volumeSlider.style.setProperty("--scale-x", this.value);

  });
  

  // Mettre à jour le curseur de temps pendant la lecture
  // audio.addEventListener('timeupdate', function() {
  //   timerSlider.value = audio.currentTime;
  // });
  timerSlider.addEventListener('input', function() {
    // wait =false;
    const newPosition = this.value;
    audio.currentTime = newPosition;
    timerSlider.style.setProperty("--scale-x2", audio.currentTime/audio.duration);
  });

  // Mettre à jour le curseur de temps pendant la lecture
  audio.addEventListener('timeupdate', function() {
    if(wait){
      timerSlider.value = audio.currentTime/audio.duration *100;
      timerSlider.style.setProperty("--scale-x2", timerSlider.value/100);
      now.textContent = buildDuration(audio.currentTime) ;
    }
  });

  volumeOff.addEventListener('click', function() {
    if(audio.volume == 0){
      audio.volume=vol;
      volumeSlider.value = vol;
      volumeSlider.style.setProperty("--scale-x", volumeSlider.value);

      this.firstElementChild.classList.remove("fa-volume-xmark");
      this.firstElementChild.classList.add("fa-volume-high");
    }else{
      vol = audio.volume;    
      audio.volume = 0;
      volumeSlider.value = 0;
      this.firstElementChild.classList.add("fa-volume-xmark");
      this.firstElementChild.classList.remove("fa-volume-high");
      volumeSlider.style.setProperty("--scale-x", volumeSlider.value);
    }
  });
  
});
})
