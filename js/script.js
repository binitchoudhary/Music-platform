const content = document.querySelector(".content"),
  Playimage = content.querySelector(".music-image img"),
  musicName = content.querySelector(".music-titles .name"),
  musicArtist = content.querySelector(".music-titles .artist"),
  Audio = document.querySelector(".main-song"),
  playBtn = content.querySelector(".play-pause"),
playBtnIcon = content.querySelector(".play-pause span"),
prevBtn = content.querySelector("#prev"),
nextBtn = content.querySelector("#next"),
progressBar = content.querySelector(".progress-bar"),
progressDetails = content.querySelector(".progress-details"),
repeatBtn = content.querySelector("#repeat"),
Shuffle = content.querySelector("#shuffle")

let index = 1;

window.addEventListener("load", ()=>{
loadData(index);
});

function loadData(indexValue){
musicName.innerHTML = songs[indexValue - 1].name;
musicArtist.innerHTML = songs[indexValue - 1].artist;
Playimage.src = "images/"+songs[indexValue - 1].img+".jpg";
Audio.src = "music/"+songs[indexValue - 1].audio+".mp3";
}

playBtn.addEventListener("click", ()=>{
    const isMusicPaused = content.classList.contains("paused");
    if(isMusicPaused){
        pauseSong();
    }
    else {
        playSong();
    }
});

function playSong(){
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    Audio.play();
}

function pauseSong() {
  content.classList.remove("paused");
  playBtnIcon.innerHTML = "play_arrow";
  Audio.pause();
}

nextBtn.addEventListener("click", ()=>{
    nextSong();
});

prevBtn.addEventListener("click", () => {
  prevSong();
});

function nextSong(){
    index++;
    if(index > songs.length){
        index=1;
    }
    else{
        index = index;
    }
    loadData(index);
    playSong();
}

function prevSong() {
  index--;
  if (index <= 0) {
    index = songs.length;
  } else {
    index = index;
  }
  loadData(index);
  playSong();
}

Audio.addEventListener("timeupdate", (e)=>{
   const initialTime = e.target.currentTime; //Get current music time
   const finalTIme = e.target.duration; //Get music duration
   let BarWidth = (initialTime/finalTIme)*100;
   progressBar.style.width = BarWidth+"%";


   progressDetails.addEventListener("click", (e)=>{
    let progressValue = progressDetails.clientWidth; //Get width of progress Bar
    let clickedOffsetX = e.offsetX; //get offset x value
    let MusicDuration = Audio.duration; //get total music duration


    Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
   });

   //Timer logic

   Audio.addEventListener("loadeddata", ()=>{
    let finalTimeData = content.querySelector(".final");

    //Update finalDuration
    let AudioDuration = Audio.duration;
    let finalMinutes = Math.floor(AudioDuration / 60);
    let finalSecond = Math.floor(AudioDuration % 60);
    if (finalSecond < 10){
        finalSecond = "0" +finalSecond
    }
    finalTimeData.innerHTML = finalMinutes+":"+finalSecond;
   });

   //Update Current Duration
   let currentTimeData = content.querySelector(".current");
   let CurrentTime = Audio.currentTime;
   let currentMinutes = Math.floor(CurrentTime / 60);
   let currentSeconds = Math.floor(CurrentTime % 60);
   if (currentSeconds < 10) {
     currentSeconds = "0" + currentSeconds;
   }
   currentTimeData.innerText = currentMinutes + ":" + currentSeconds;

   //repeat button logic
   repeatBtn.addEventListener("click", ()=>{
    Audio.currentTime = 0;
   })
});

//shuffle logic

Shuffle.addEventListener("click",()=>{
    var randomIndex = Math.floor(Math.random() *songs.length) + 1; //select rendom between 1 to song
    loadData(randomIndex);
    playSong();
})

Audio.addEventListener("ended", ()=>{
    index++;
    if(index >songs.length){
        index = 1;
    }
    loadData(index);
    playSong();
})