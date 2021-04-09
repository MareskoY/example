const {configTest} = require('../helpers/common')
const {deposit, borrow} = require('../helpers/steps')
const DepositPage = require('../pageobjects/deposit.page')
const InputPage = require('../pageobjects/input.page')
const ConfirmationPage = require('../pageobjects/confirmation.page')

const DepositList = require('../fixtures/deposit.list.json')
const testData ={
  network: 'Localhost 8545',
  privatKey: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'
}

describe.skip('DEPOSIT spec',()=> {
  let setupStatus = false
  configTest(testData.network, testData.privateKey)
  deposit(
    "ETH",
    100,
    () => {
      setupStatus = true
    }
  )

  DepositList.forEach((deposit) => {
    let depositStatus = false
    describe(`DEPOSIT TEST FOR ${deposit.asset}`,()=>{
      before(function() {
        if(!setupStatus) this.skip()
      })
      borrow(
        deposit.asset,
        deposit.amount,
        ()=>{depositStatus = true},
        deposit.hasBorrowApproval
      )
      describe(`Deposit process for ${deposit.asset}`,()=>{
        let amount = deposit.amount/2
        before(function() {
          if(!depositStatus) this.skip()
        })
        it(`Open ${deposit.asset} deposit view`, ()=>{
          DepositPage.open()
          DepositPage.openAssetDepositPage(deposit.asset)
        })
        it(`Set ${amount} deposit amount for ${deposit.asset}`, () => {
          InputPage.doRefreshIfConnectStuck()
          InputPage.doSubmitAmount(amount)
        })
        it(`Make approve for ${deposit.asset}, on confirmation page`, (done) => {
          if(deposit.hasDepositApproval){
            ConfirmationPage.doOneStepProcess()
            ConfirmationPage.doIsSuccessOneStepProcess()
          }else{
            ConfirmationPage.doTwoStepProcess()
            ConfirmationPage.doIsSuccessTwoStepProcess()
          }
        })
      })
    })
  })
})
