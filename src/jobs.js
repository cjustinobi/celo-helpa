import {TRANSACTION_STATUS, pascalToWord, truncateAddr} from './utils'
import './navigation'

import {
  connectCeloWallet,
  notification,
  notificationOff,
  kit,
  contract,
  getBalance
} from './common'

let jobs = []

const getJobs = async function() {

  const _vendorTransactionLength = await contract.methods.getVendorTransactionCount().call()
  const _jobs = []

  for (let i = 0; i < _vendorTransactionLength; i++) {

    let _job = new Promise(async (resolve) => {
      let p = await contract.methods.getVendorTransactions(i, kit.defaultAccount).call()
      p.index = i

      resolve(p)
    })
    _jobs.push(_job)
  }

  jobs = await Promise.all(_jobs)
  renderJobs()
}

function renderJobs() {
  document.getElementById('jobs').innerHTML = ''
  if (jobs.length) {
    jobs.forEach((_job) => {
      const newDiv = document.createElement('div')
      newDiv.className = 'col-md-4'
      newDiv.innerHTML = jobTemplate(_job)
      document.getElementById('jobs').appendChild(newDiv)
    })
  } else {
    document.getElementById('jobs').innerHTML = 'You have no job record'
  }

}

function jobTemplate(_transaction) {
  return `
    <div class="card mb-4">
      <p class="p-3">${truncateAddr(_transaction.customer)}</p>
      <div class="state-${_transaction.status} bg-warning mt-4 px-2 py-1 p-3">
        ${pascalToWord(TRANSACTION_STATUS(_transaction.status))}
      </div>
      <div class="card-body text-left p-4 position-relative">   
        <div class="d-grid gap-2">
          <a class="${_transaction.transactionIndex} status-${_transaction.status} btn btn-lg btn-outline-dark markCompleted fs-6 p-3" id=${_transaction.status}>
            ${_transaction.status == '1' ? 'Mark Completed' : _transaction.status == '2' ? 'Reviewing' : 'Completed'}
          </a>
        </div>
      </div>
    </div>
  `
}


window.addEventListener('load', async () => {
  notification('⌛ Loading...')
  await connectCeloWallet()
  await getBalance()
  await getJobs()
  notificationOff()

})

document.addEventListener("DOMContentLoaded", function() {

  document.querySelector('#jobs').addEventListener('click', async (e) => {

    if (window.location.pathname.includes('jobs')) {

      debugger

      const el = e.target
      if (el.className.includes('markCompleted') && (el.id == '1')) {

        notification(`⌛ Awaiting transaction update...`)
        try {
          const index = el.classList[0]
          let cUSDcontract = await kit.contracts.getStableToken()

          await contract.methods
            .serviceReviewing(index, jobs[index].customer)
            .send({ from: kit.defaultAccount, feeCurrency: cUSDcontract.address })

          notification(`🎉 Transaction sent for review!`)

          await getJobs()

        } catch (error) {
          notification(`⚠️ ${error}.`)
        }
      }

    }
  })

})

