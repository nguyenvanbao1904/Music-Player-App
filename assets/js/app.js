import songs from "./data.js";
const playList = document.querySelector('.song-list')
const audio = document.querySelector('.audio')
var isPlaying = false


function start(){
    renderSongs()
    clickSong()
    playPauseBtn()
}
start()


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
    
    const player = document.querySelector('.player')

    songItem.forEach(function(song,index){
        song.onclick = function(){
            player.classList.add('playing')
            name.textContent = songs[index].name
            audio.src= songs[index].src
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
            } else{
                isPlaying = true
                player.classList.add('playing')
                audio.play()
            }
        }
    })
}