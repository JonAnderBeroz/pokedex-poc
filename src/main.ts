import './style.css'

const $ = (element: string): HTMLElement | null => document.querySelector(element)

const findActiveIndex = (element: HTMLElement): number => {
  let index = 0
  for (const child of element.children) {
    if (child.classList.contains('active')) return index
    index++
  }
  return -1
}

const setIndexes = (list: HTMLElement): void => {
  let index = 0
  for (const child of list.children) {
    (child as HTMLElement).style.setProperty('--index', `${index}`)
    index++
  }
}

const list = $('ul')
const pokeball = $('.pokeball')

if (list !== null && pokeball !== null) {
  let active = findActiveIndex(list)
  setIndexes(list)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    list.children[active].classList.remove('active')
    if (e.key === 'ArrowDown') {
      active++
      if (active > list.childElementCount - 1) {
        active = 0
      }
    } else if (e.key === 'ArrowUp') {
      active--
      if (active < 0) {
        active = list.childElementCount - 1
      }
    }
    pokeball.animate([
      { transform: 'rotate(-360deg)' }
    ], {
      duration: 200,
      iterations: 1
    })
    list.children[active].classList.add('active')
    list.style.setProperty('--activeIndex', `${active}`)
  })
  list.style.setProperty('--activeIndex', `${active}`)
}
