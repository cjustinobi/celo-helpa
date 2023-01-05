import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import BigNumber from 'bignumber.js'
import marketplaceAbi from '../contract/Helpa.abi.json'
import erc20Abi from '../contract/erc20.abi.json'

const ERC20_DECIMALS = 18
const MPContractAddress = '0x704465f9993c2F47650212fb7DC84BE00b9f7a36'
const cUSDContractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'

let kit
let contract
let vendors = []

const connectCeloWallet = async function () {
  if (window.celo) {
    notification('⚠️ Please approve this DApp to use it.')
    try {
      await window.celo.enable()
      notificationOff()

      const web3 = new Web3(window.celo)
      kit = newKitFromWeb3(web3)

      const accounts = await kit.web3.eth.getAccounts()
      kit.defaultAccount = accounts[0]

      contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
    } catch (error) {
      notification(`⚠️ ${error}.`)
    }
  } else {
    notification('⚠️ Please install the CeloExtensionWallet.')
  }
}

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
          <a class="btn btn-lg btn-outline-dark buyBtn fs-6 p-3" id=${
    _vendor.index
  }>
            
            Hire for ${new BigNumber(_vendor.price).shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD
          </a>
        </div>
      </div>
    </div>
  `
}

// Hire for ${_vendor.price.shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD

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

function notification(_text) {
  document.querySelector('.alert').style.display = 'block'
  document.querySelector('#notification').textContent = _text
}

function notificationOff() {
  document.querySelector('.alert').style.display = 'none'
}

window.addEventListener('load', async () => {
  notification('⌛ Loading...')
  await connectCeloWallet()
  await getBalance()
  await getVendors()
  notificationOff()
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
  if (e.target.className.includes('buyBtn')) {
    const index = e.target.id
    notification('⌛ Waiting for payment approval...')
    try {
      await approve(products[index].price)
    } catch (error) {
      notification(`⚠️ ${error}.`)
    }
    notification(`⌛ Awaiting payment for '${products[index].name}'...`)
    try {
      const result = await contract.methods
        .buyProduct(index)
        .send({ from: kit.defaultAccount })
      notification(`🎉 You successfully bought '${products[index].name}'.`)
      getProducts()
      getBalance()
    } catch (error) {
      notification(`⚠️ ${error}.`)
    }
  }
})