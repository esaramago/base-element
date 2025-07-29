import './style.css'
import 'prismjs/themes/prism.min.css'

import './webcomponents/card.js'
import './webcomponents/hello.js'
import './webcomponents/button.js'
import './webcomponents/input.js'
import './webcomponents/alert.js'
import './webcomponents/switch.js'
import './webcomponents/badge.js'
import './webcomponents/code.js'
import './webcomponents/counter.js'


const randomNames = ['Base Element', 'Web Component', 'Custom Element', 'Web Components', 'Web Developers', 'Designers', 'World', 'Creators', 'Base Component']


document.addEventListener('DOMContentLoaded', () => {
  
  const headerCard = document.getElementById('header-hello')
  headerCard.name = randomNames[0]

  setInterval(() => {
    headerCard.name = getRandomName(headerCard.name)
  }, 3000)
})


function getRandomName(currentName) {
  let randomName = randomNames[Math.floor(Math.random() * randomNames.length)]
  while (randomName === currentName) {
    randomName = randomNames[Math.floor(Math.random() * randomNames.length)]
  }
  return randomName
}