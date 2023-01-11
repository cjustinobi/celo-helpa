const links = ['jobs', 'transactions']

function setNavigationElement() {
  links.forEach((item) => {
    const a = document.createElement('p')
    a.id = item + '-link'
    a.innerText = (`my-${item}`).toUpperCase()
    document.getElementById('links').appendChild(a)
  })
}
setNavigationElement()

window.addEventListener('load', async () => {

  document.getElementById('jobs-link').addEventListener('click', () => {
    window.location = 'my-jobs.html'
  })

  document.getElementById('transactions-link').addEventListener('click', () => {
    window.location = 'my-transactions.html'
  })

  document.getElementById('logo').addEventListener('click', () => {
    window.location = 'index.html'
  })
})