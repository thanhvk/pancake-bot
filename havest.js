const Web3EthContract = require('web3-eth-contract')
const POOL_CONTRACT_ABI = require('./MasterChef.json')
const BigNumber = require('bignumber.js')

const POOL_CONTRACT_ADDRESS = '0x73feaa1eE314F8c655E354234017bE2193C9E24E'
const POOL_IDX = 0
const USER_ADDRESS = '0x585D41568BE82985C5CafD4e37d395F5c96dD656'

// Web3EthContract.setProvider('wss://bsc-ws-node.nariox.org:443');
Web3EthContract.setProvider('https://bsc-dataseed.binance.org');

const poolContract = new Web3EthContract(POOL_CONTRACT_ABI.abi, POOL_CONTRACT_ADDRESS)

const getPendingCake = async () => {
    const result = await poolContract.methods.pendingCake(POOL_IDX, USER_ADDRESS).call()
    const pendingCake = BigNumber(result).div(10**18).toFormat(3)
    return pendingCake
}

const getUserInfo = async () => {
    const { amount, rewardDebt } = await poolContract.methods.userInfo(POOL_IDX, USER_ADDRESS).call()
    const userInfo = { amount, rewardDebt }

    for (const key in userInfo) {
        userInfo[key] = BigNumber(userInfo[key]).div(10**18).toFormat(3)
    }
    
    return userInfo
}

exports.handler = async () => {
    const pendingCake = await getPendingCake()
    const userInfo = await getUserInfo()

    return {
        pendingCake,
        userInfo,
    }
}

