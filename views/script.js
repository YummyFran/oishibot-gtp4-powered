const chat = document.getElementsByClassName('chat')
const que = document.getElementsByClassName('que')[0]

for(let i = 0; i < chat.length; i++) {
    if(chat[i].innerText.length > 22) 
        chat[i].classList.add('show')
}

function submitted() {
    chat[0].innerText = que.value
    chat[1].innerText = "..."
}