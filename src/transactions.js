import BigNumber from 'bignumber.js'
import './navigation'

import {
  ERC20_DECIMALS,
  MPContractAddress,
  cUSDContractAddress,
  connectCeloWallet,
  notification,
  notificationOff,
  kit,
  contract
} from './common'

let transactions = []


const getTransactions = async function() {

  const _transactionLength = await contract.methods.getTransactionCount().call()
  const _transactions = []
// console.log('aaaaa ', _transactionLength)
  for (let i = 0; i < _transactionLength; i++) {

    let _transaction = new Promise(async (resolve) => {
      let p = await contract.methods.getTransactions(i, kit.defaultAccount).call()
      p.index = i

      resolve(p)
    })
    _transactions.push(_transaction)
  }

  transactions = await Promise.all(_transactions)
  // console.log('xxx ', transactions)
  renderTransactions()
}

function renderTransactions() {
  document.getElementById('transactions').innerHTML = ''
  transactions.forEach((_transaction) => {
    const newDiv = document.createElement('div')
    newDiv.className = 'col-md-4'
    newDiv.innerHTML = transactionTemplate(_transaction)
    document.getElementById('transactions').appendChild(newDiv)
  })
}

function transactionTemplate(_transaction) {
  return `
    <div class="card mb-4">
      <img class="card-img-top" src="${_transaction.filePath}" alt="...">
      <div class="position-absolute top-0 end-0 bg-warning mt-4 px-2 py-1 rounded-start">
        ${_transaction.transCount} Transactions
      </div>
      <div class="card-body text-left p-4 position-relative">
        <h2 class="card-title fs-4 fw-bold mt-2">${_transaction.businessName}</h2>
        <p class="card-text mb-4" style="min-height: 82px">
          ${_transaction.description}             
        </p>
      
        <div class="d-grid gap-2">
          <a class="btn btn-lg btn-outline-dark hireBtn fs-6 p-3" id=${
    _transaction.index
  }>
            
            Hire for ${new BigNumber(_transaction.amount).shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD
          </a>
        </div>
      </div>
    </div>
  `
}


window.addEventListener('load', async () => {
  notification('⌛ Loading...')
  await connectCeloWallet()
  await getTransactions()
  notificationOff()

})
