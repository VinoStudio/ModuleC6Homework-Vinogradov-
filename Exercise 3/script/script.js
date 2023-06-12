const userInput = document.querySelector('.user_message')
const buttonSend = document.querySelector('.send')
const buttonGeo = document.querySelector('.location')
const chatWindow = document.querySelector('.text_window')

function createMessage(message, style){
    let element = `<p class="message" style="align-self: ${style}">${message}</p>`
    chatWindow.innerHTML += element
    chatWindow.scrollTo(0, chatWindow.scrollHeight)
}

let server = new WebSocket('wss://echo-ws-service.herokuapp.com')
server.onopen = function(event) {
    console.log('Соединение успешно установлено')
};
server.onmessage = function(event){
    createMessage(`Сервер: ${event.data}`, 'flex-start')
}
server.onerror = function(event){
    createMessage(`Сервер: ${event.data}`, 'flex-start')
}
server.onclose = function(event){
    createMessage('От клиента нет действий, отключаюсь')
}

buttonSend.addEventListener('click', (event) => {
    const inputValue = userInput.value
    if (inputValue) {
        server.send(inputValue)
        createMessage(`Вы: ${inputValue}`, 'flex-end')
    }else {
        alert('Сначала введите сообщение!')
    }
    userInput.value = ''
})

const error = () => {
    server.send('Невозможно получить ваше местоположение')
}
const success = (position) => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    const geoLink = `https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`;
    const geoMessage = `<a class="message" target="_blank" style="align-self: flex-start" href="${geoLink}">Сервер: Ваша Гео-локация</a>`;
    chatWindow.innerHTML += geoMessage
}
buttonGeo.addEventListener('click', (event) => {
    if (!navigator.geolocation) {
        alert('Браузер не поддерживает геолокацию!')
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }
});


