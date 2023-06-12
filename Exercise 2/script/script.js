//Из меня отличный математик =(

const button = document.querySelector('.button')
const width = document.querySelector('.width')

button.addEventListener('click', (e) => {
    if (typeof Notification !== 'undefined' && Notification.permission !== 'denied') {
        Notification.requestPermission()
            .then((permission) => {
                if (permission === 'granted') {
                    const notification =
                        new Notification(`Ширина и высота твоего экрана: ${window.screen.width}px. на ${window.screen.height} px.`)
                }
            })

    }
    width.innerText = `Ширина и высота твоего экрана: ${window.screen.width}px. x ${window.screen.height}px.`
});

