const Web3EthContract = require('web3-eth-contract')
const POOL_CONTRACT_ABI = require('./MasterChef.json')
const BigNumber = require('bignumber.js')
const axios = require('axios')

const POOL_CONTRACT_ADDRESS = '0x73feaa1eE314F8c655E354234017bE2193C9E24E'
const POOL_IDX = 0
const USER_ADDRESS = '0x585D41568BE82985C5CafD4e37d395F5c96dD656'

// Web3EthContract.setProvider('wss://bsc-ws-node.nariox.org:443');
Web3EthContract.setProvider('https://bsc-dataseed.binance.org');

const poolContract = new Web3EthContract(POOL_CONTRACT_ABI.abi, POOL_CONTRACT_ADDRESS)

const getPendingCake = async () => {
    try {
        const result = await poolContract.methods.pendingCake(POOL_IDX, USER_ADDRESS).call()
        return BigNumber(result).div(10**18).toFormat(3)
    } catch (error) {
        return ''
    }
}

const getUserCake = async () => {
    try {
        const { amount } = await poolContract.methods.userInfo(POOL_IDX, USER_ADDRESS).call()
        return BigNumber(amount).div(10**18).toFormat(3)    
    } catch (error) {
        return ''
    }
}

const getCurrentCakePrice = async () => {
    try {
        const { data: {'pancakeswap-token': {usd}}} = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=pancakeswap-token&vs_currencies=usd')
        return usd
    } catch (error) {
        return ''
    }
}

exports.handler = async () => {
    let pendingCake, userCake, price

    pendingCake = await getPendingCake()
    userCake = await getUserCake()
    price = await getCurrentCakePrice()
    
    return {
        pendingCake,
        userCake,
        price,
    }
}

