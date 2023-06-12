//Из меня отличный математик =(

const button = document.querySelector('.button')
const images = document.querySelectorAll('svg')
const len = images.length - 1
let index = 0

function visibility(index) {
    if(index !== 5){
        images[index + 1].style.display = 'block';
    }
}
button.addEventListener('click', (e) => {
    if (index === len) {
        images[index].style.display = 'none'
        images[0].style.display = 'block'
        index = -1
    } else if (images[index].style.display === 'block') {
        images[index].style.display = 'none'
        visibility(index)
    }
    index++
})