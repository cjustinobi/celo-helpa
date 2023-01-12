import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import marketplaceAbi from '../contract/Helpa.abi.json'

export const ERC20_DECIMALS = 18
export const MPContractAddress = '0x45CaAa9e84F3a6f5A7eF31A083FE1cB3aA8B515B'
export const cUSDContractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'

export let kit
export let contract

export const connectCeloWallet = async function () {
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


export const notification = (_text) => {
  document.querySelector('.alert').style.display = 'block'
  document.querySelector('#notification').textContent = _text
}

export const notificationOff = () => {
  document.querySelector('.alert').style.display = 'none'
}