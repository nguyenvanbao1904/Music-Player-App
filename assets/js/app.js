import songs from "./data.js";
const playList = document.querySelector('.song-list')
const audio = document.querySelector('.audio')
const cdThumb = document.querySelector('.music-player-img')
    const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
    ],{
        duration: 10000,
        iterations: Infinity
    })

var isPlaying = false


function start(){
    renderSongs()
    clickSong()
    playPauseBtn()
    showMusicPlayer()
    handelMusicPlayer()
}
start()


function formatTime(sec_num) {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

    hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
}

function renderSongs(){
    const htmls = songs.map(function(song,index){
        return `
            <li class="song-item song-item-${index}">
                <div class="info">
                    <p>${song.name}</p>
                    <p>${song.singer}</p>
                </div>
                <div class="song-time">
                    <span>${song.time}</span>
                </div>
            </li>
        `
    })
    playList.innerHTML = htmls.join('')
}

function clickSong(){
    const footer = document.querySelector('.footer')
    const songItem = document.querySelectorAll('.song-item')
    const name = document.querySelector('.name')
    const singer = document.querySelector('.singer')
    const player = document.querySelector('.player')

    const playingImg = document.querySelector('.music-player-img')
    const playingName = document.querySelector('.music-player-name')
    const playingSinger = document.querySelector('.music-player-singer')
    
    songItem.forEach(function(song,index){
        song.onclick = function(){
            player.classList.add('playing')
            name.textContent = songs[index].name
            singer.textContent = songs[index].singer
            audio.src= songs[index].src

            playingImg.src=songs[index].img
            playingName.textContent = songs[index].name
            playingSinger.textContent = songs[index].singer
            
            //run
            footer.classList.remove("hiden")
            isPlaying = true
            audio.play()
        }
    })
}

function playPauseBtn(){
    const player = document.querySelector('.player')
    const btns = document.querySelectorAll('.footer span')
    btns.forEach(function(btn){
        btn.onclick = function(){
            if(isPlaying){
                isPlaying = false
                player.classList.remove('playing')
                audio.pause()
                cdThumbAnimate.pause()
            } else{
                isPlaying = true
                player.classList.add('playing')
                audio.play()
                cdThumbAnimate.play()
            }
        }
    })
}

function showMusicPlayer(){
        const footer = document.querySelector('.footer')
        const spanIconPause = document.querySelector('.player span:first-child')
        const spanIconPlay = document.querySelector('.player span:last-of-type')
        const iconPause = document.querySelector('.icon-pause')
        const iconPlay = document.querySelector('.icon-play')
        const musicPlayer = document.querySelector('.music-player-container')
    
        footer.onclick = function(e){
            if(e.target != spanIconPause && e.target != spanIconPlay &&
                 e.target != iconPause && e.target != iconPlay){
                    musicPlayer.classList.add('show')
                    checkPlaying()
            }
        }
}

function handelMusicPlayer(){
    const playingTimeEnd = document.querySelector('.playing-time-end')
    const playingTimeStart = document.querySelector('.playing-time-start')
    const range = document.querySelector('.range')
    const player = document.querySelector('.play-or-pause')
    const btns = document.querySelectorAll('.play-or-pause span')
    const backBtn = document.querySelector('.back-btn')
    const musicPlayer = document.querySelector('.music-player-container')
    const iconHeart = document.querySelector('.icon-heart')

    function setTimeStart(){
        playingTimeStart.textContent = formatTime(audio.currentTime)
    }
    setInterval(setTimeStart)
    function getTimeEnd(){
        playingTimeEnd.textContent = formatTime(audio.duration)
    }
    setTimeout(getTimeEnd,3000)

    range.onchange = function(e){
        const seekTime = audio.duration/100*e.target.value
        audio.currentTime = seekTime
    }
    audio.ontimeupdate = function(){
        range.value = audio.currentTime / audio.duration *100
    }
    btns.forEach(function(btn){
        btn.onclick = function(){
            if(isPlaying){
                isPlaying = false
                player.classList.remove('playing')
                audio.pause()
                cdThumbAnimate.pause()
            } else{
                isPlaying = true
                player.classList.add('playing')
                audio.play()
                cdThumbAnimate.play()
            }
        }
    })
    backBtn.onclick = function(){
        musicPlayer.classList.remove('show')
    }
    iconHeart.onclick = function(){
        iconHeart.classList.toggle('active')
    }
}

function checkPlaying(){
    const player = document.querySelector('.play-or-pause')
    if(isPlaying){
        player.classList.add('playing')
    } else{
        player.classList.remove('playing')
    }
}