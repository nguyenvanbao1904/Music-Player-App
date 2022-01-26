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
var isLoop = false
var isRandom = false
var currentIndex


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

function upadteSong(index){
    const playingImg = document.querySelector('.music-player-img')
    const playingName = document.querySelector('.music-player-name')
    const playingSinger = document.querySelector('.music-player-singer')

    const footer = document.querySelector('.footer')
    const songItem = document.querySelectorAll('.song-item')
    const name = document.querySelector('.name')
    const singer = document.querySelector('.singer')
    const player = document.querySelector('.player')
    const playingTimeEnd = document.querySelector('.playing-time-end')

    audio.src = songs[index].src
    playingImg.src=songs[index].img
    playingName.textContent = songs[index].name
    playingSinger.textContent = songs[index].singer
    audio.play()

    player.classList.add('playing')
    name.textContent = songs[index].name
    singer.textContent = songs[index].singer
    playingTimeEnd.textContent = songs[index].time

}

function clickSong(){
    const footer = document.querySelector('.footer')
    const songItem = document.querySelectorAll('.song-item')
    
    songItem.forEach(function(song,index){
        song.onclick = function(){
            upadteSong(index)
            //run
            footer.classList.remove("hiden")
            isPlaying = true
            audio.play()
            NextOrBack(index)
            handelMusicEnd(index)
            currentIndex = index
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

    function setTimeStart(){
        playingTimeStart.textContent = formatTime(audio.currentTime)
    }
    setInterval(setTimeStart)
    // function getTimeEnd(){
    //     playingTimeEnd.textContent = formatTime(audio.duration)
    // }
    // setTimeout(getTimeEnd,5000)

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
}

function checkPlaying(){
    const player = document.querySelector('.play-or-pause')
    if(isPlaying){
        player.classList.add('playing')
    } else{
        player.classList.remove('playing')
    }
}

function NextOrBack(index){
    const nextBtn = document.querySelector('.btn-next')
    const backBtn = document.querySelector('.btn-back')
    const playingImg = document.querySelector('.music-player-img')
    const playingName = document.querySelector('.music-player-name')
    const playingSinger = document.querySelector('.music-player-singer')

    const footer = document.querySelector('.footer')
    const songItem = document.querySelectorAll('.song-item')
    const name = document.querySelector('.name')
    const singer = document.querySelector('.singer')
    const player = document.querySelector('.player')
    
    nextBtn.onclick = function(){
        isPlaying = true
        if(index < songs.length - 1){
            index++
            upadteSong(index)
        } else{
            index = 0
            upadteSong(index)
        }
        currentIndex = index
        checkPlaying()
    }

    backBtn.onclick = function(){
        isPlaying = true
        if(index > 0){
            index--
            upadteSong(index)
        } else{
            index = songs.length - 1
            upadteSong(index)
        }
        currentIndex = index
        checkPlaying()
    }
}

function handelMusicEnd(index){
    checkLoop()
    checkRandom()
    audio.onended = function(){
        if(!isLoop){
            if(isRandom){
                playRandom()
            } else{
                if(index < songs.length -1){
                    index++
                    upadteSong(index)
                } else{
                    index = 0
                    upadteSong(index)
                }
            }
        } else{
            audio.play()
        }
    }
}

function checkLoop(){
    const loopIcon = document.querySelector('.icon-loop')

    loopIcon.onclick = function(){
        loopIcon.classList.toggle('active')
        if(loopIcon.classList.contains('active')){
            isLoop = true
        } else{
            isLoop = false
        }
    }
}

function checkRandom(){
    const randomIcon = document.querySelector('.random-icon')

    randomIcon.onclick = function(){
        randomIcon.classList.toggle('active')
        if(randomIcon.classList.contains('active')){
            isRandom = true
        } else{
            isRandom = false
        }
    }
}

function playRandom(){
    checkRandom()
    let newIndex
    do{
        newIndex = Math.floor(Math.random()*songs.length)
    } while(currentIndex===newIndex)
    upadteSong(newIndex)
}