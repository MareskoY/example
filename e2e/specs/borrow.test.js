const{configTest} = require('../helpers/common')
const {deposit} = require('../helpers/steps')
const BorrowPage = require('../pageobjects/borrow.page')
const InputPage = require('../pageobjects/input.page')
const ConfirmationPage = require('../pageobjects/confirmation.page')

const BorrowList = require('../fixtures/borrow.list.json')
const testData ={
  network: 'Localhost 8545',
  privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
}

describe('BORROW spec', ()=>{
  let setupStatus = false
  configTest(testData.network, testData.privateKey)
  deposit(
    "ETH",
    100,
    ()=>{setupStatus = true}
  )

  BorrowList.forEach((borrow) => {
    describe(`BORROW TEST FOR ${borrow.asset}`, () => {
      before(function () {
        if(!setupStatus) this.skip()
      })
      it(`Open ${borrow.asset} borrow view`, () => {
        BorrowPage.open()
        BorrowPage.openAssetBorrowPage(borrow.asset)
      })
      it(`Set ${borrow.amount} borrow amount for ${borrow.asset}`, () => {
        InputPage.doRefreshIfConnectStuck()
        InputPage.doSubmitAmount(borrow.amount)
        InputPage.doChooseVariableAPR()
      })
      it(`Make approve for ${borrow.asset}, on confirmation page`, () => {
        if(borrow.hasApproval){
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


