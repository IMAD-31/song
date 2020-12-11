const image = document.querySelector('img')
const title= document.getElementById('title')
const artist= document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer=document.getElementById('progress-container')
const progress= document.getElementById('progress')
const currentTime1=document.getElementById('current-time')
const duration1= document.getElementById('duration')
const prevBtn =document.getElementById('prev')
const playBtn =document.getElementById('play')
const nextBtn =document.getElementById('next')

//Music
const  song =[
{
name:'jacinto-1',
displayName:'Elctric Chill Machine',
artist:'Jacinto Design'

}
,
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  }


]

//check if playing
let isPlaying=false
//play
function playSong(){
    isPlaying=true
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','pause')
music.play()

}
//pause
function pauseSong(){
    isPlaying=false
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','play')
music.pause()

}

//play event 
playBtn.addEventListener('click',()=>{
isPlaying ? pauseSong() : playSong()

})
//update DOM
function loadSong(song){
title.textContent=song.displayName
artist.textContent= song.artist
music.src=`music/${song.name}.mp3`
image.src=`img/${song.name}.jpg`
}

//currentsong
let songIndex=0;


//On load first song
loadSong(song[0])
//next Song
function nextSong(){
    songIndex++;
    if (songIndex>song.length-1) {
        songIndex=0;
    }

loadSong(song[songIndex])
playSong()

}
//prev song
function prevSong(){
    songIndex--;
    if (songIndex<0) {
        songIndex = song.length - 1;

    }
    
    loadSong(song[songIndex])
    playSong()
    
    }
    //updateProgressBar & time
function updateProgressBar(e){
if (isPlaying) {
   const {duration,currentTime}=e.srcElement;//or music
   //update progress bar witdh
   const progressPercent=(currentTime/duration)*100;
   progress.style.width=`${progressPercent}%`
   //calculate durration
const durationMinute =Math.floor(duration /60) ;
let durationSeconds= Math.floor(duration % 60)
if(durationSeconds<10){
durationSeconds=`0${durationSeconds}`
}
//delay to avoid NAN
if(durationSeconds){duration1.textContent=`${durationMinute}:${durationSeconds}`
}
//calculate currentTime
const currentMinute =Math.floor(currentTime /60) ;
 let currentSeconds= Math.floor(currentTime % 60)
 if(currentSeconds<10){
 currentSeconds=`0${currentSeconds}`
 }
 currentTime1.textContent=`${currentMinute}:${currentSeconds}`
}
 
 
}


//set Progress Bar
function setProgressBar(e) {
    const width= this.clientWidth//or e.srcElement.clientWidth or progressContainer.clientWidth
    
    const clickX=e.offsetX
   const  {duration}=music
   
  
   music.currentTime = (clickX/width)*duration;

}
//event button
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar)
music.addEventListener('ended',nextSong)
progressContainer.addEventListener('click',setProgressBar)