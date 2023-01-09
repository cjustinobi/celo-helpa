
import BigNumber from 'bignumber.js'
import erc20Abi from '../contract/erc20.abi.json'
import './navigation'
import './transactions'

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


let vendors = []



async function approve(_price) {
  const cUSDContract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)

  const result = await cUSDContract.methods
    .approve(MPContractAddress, _price)
    .send({ from: kit.defaultAccount })
  return result
}

const getBalance = async function () {
  const totalBalance = await kit.getTotalBalance(kit.defaultAccount)
  const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)
  document.querySelector('#balance').textContent = cUSDBalance
}

const getVendors = async function() {
  const _vendorLength = await contract.methods.getVendorCount().call()
  const _vendors = []

  for (let i = 0; i < _vendorLength; i++) {
    let _vendor = new Promise(async (resolve) => {
      let p = await contract.methods.getVendors(i).call()
      p.index = i

      resolve(p)
    })
    _vendors.push(_vendor)
  }

  vendors = await Promise.all(_vendors)
  console.log(vendors)
  renderVendors()
}

function renderVendors() {
  document.getElementById('marketplace').innerHTML = ''
  vendors.forEach((_vendor) => {
    const newDiv = document.createElement('div')
    newDiv.className = 'col-md-4'
    newDiv.innerHTML = vendorTemplate(_vendor)
    document.getElementById('marketplace').appendChild(newDiv)
  })
}

function vendorTemplate(_vendor) {
  return `
    <div class="card mb-4">
      <img class="card-img-top" src="${_vendor.filePath}" alt="...">
      <div class="position-absolute top-0 end-0 bg-warning mt-4 px-2 py-1 rounded-start">
        ${_vendor.transCount} Transactions
      </div>
      <div class="card-body text-left p-4 position-relative">
        <div class="translate-middle-y position-absolute top-0">
        ${identiconTemplate(_vendor.vendorAddress)}
        </div>
        <h2 class="card-title fs-4 fw-bold mt-2">${_vendor.businessName}</h2>
        <p class="card-text mb-4" style="min-height: 82px">
          ${_vendor.description}             
        </p>
      
        <div class="d-grid gap-2">
          <a class="btn btn-lg btn-outline-dark hireBtn fs-6 p-3" id=${
    _vendor.index
  }>
            
            Hire for ${new BigNumber(_vendor.price).shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD
          </a>
        </div>
      </div>
    </div>
  `
}

function identiconTemplate(_address) {
  const icon = blockies
    .create({
      seed: _address,
      size: 8,
      scale: 16,
    })
    .toDataURL()

  return `
  <div class="rounded-circle overflow-hidden d-inline-block border border-white border-2 shadow-sm m-0">
    <a href="https://alfajores-blockscout.celo-testnet.org/address/${_address}/transactions"
        target="_blank">
        <img src="${icon}" width="48" alt="${_address}">
    </a>
  </div>
  `
}



window.addEventListener('load', async () => {
  // notification('⌛ Loading...')
  await connectCeloWallet()
  await getBalance()
  await getVendors()
  await test()

  // notificationOff()
});

document
  .querySelector('#createAccountBtn')
  .addEventListener('click', async (e) => {
    const params = [
      document.getElementById('businessName').value,
      document.getElementById('profession').value,
      document.getElementById('filePath').value,
      document.getElementById('description').value,
      new BigNumber(document.getElementById('price').value)
        .shiftedBy(ERC20_DECIMALS)
        .toString()
    ]
    notification(`⌛ Adding '${params[0]}'...`)
    try {
      await contract.methods
        .createVendor(...params)
        .send({ from: kit.defaultAccount })
    } catch (error) {
      notification(`⚠️ ${error}.`)
    }
    notification(`🎉 Account successfully created '${params[0]}'.`)
    getVendors()
  })

document.querySelector('#marketplace').addEventListener('click', async (e) => {
  if (e.target.className.includes('hireBtn')) {
    const index = e.target.id
    // notification('⌛ Waiting for payment approval...')
    // try {
    //   await approve(products[index].price)
    // } catch (error) {
    //   notification(`⚠️ ${error}.`)
    // }
    // return console.log(index)
    notification(`⌛ Awaiting payment for '${vendors[index].businessName}'...`)
    try {
      let cUSDcontract = await kit.contracts.getStableToken();
      const result = await contract.methods
        .createTransaction(index, vendors[index].vendorAddress)
        .send({ from: kit.defaultAccount, value: vendors[index].price, feeCurrency: cUSDcontract.address })
      notification(`🎉 You successfully hired '${vendors[index].businessName}'.`)

      console.log(result)
      getVendors()
      getBalance()
    } catch (error) {
      notification(`⚠️ ${error}.`)
    }
  }
})