const{configTest} = require('../../helpers/common')
const {deposit, borrow} = require('../../helpers/steps')

const testData ={
  network: 'Localhost 8545',
  privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  asset:{
    name:'ETHtt',
    deposit:{
      amount: 1000,
      hasApproval: true
    },
    borrow:{
      amount: 100,
      hasApproval: false
    },
    withdraw:{

    },
  }
}



describe('ETH SPEC',  ()=>{
  let skipStatus = false
  configTest(testData.network, testData.privateKey)

  deposit(
    testData.asset.name,
    testData.asset.deposit.amount,
    testData.asset.deposit.hasApproval,
    skipStatus
  )
  borrow(
    testData.asset.name,
    testData.asset.borrow.amount,
    testData.asset.borrow.hasApproval,
    skipStatus
  )

})

