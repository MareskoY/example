const InputPage = require('../pageobjects/input.page')
const ConfirmationPage = require('../pageobjects/confirmation.page')
const DepositPage = require('../pageobjects/deposit.page')
const BorrowPage = require('../pageobjects/borrow.page')
const DashboardPage = require('../pageobjects/dashboard.page')

module.exports.deposit = (asset, amount, hasApproval = true, skip = false, skipFunc) =>{
  return describe(`Deposit process for ${asset}`, () => {
    let passed = false
    before(function(){
      if(skip){
        this.skip()
      }
    })
    it(`Open ${asset} borrow view`, () => {
      DepositPage.open()
      DepositPage.openAssetDepositPage(asset)
    })
    it(`Set ${amount} deposit amount for ${asset}`, () => {
      InputPage.doRefreshIfConnectStuck()
      InputPage.doSubmitAmount(amount)
    })
    it(`Make approve for ${asset}, on confirmation page`, (done) => {
      if(hasApproval){
        ConfirmationPage.doOneStepProcess()
        ConfirmationPage.doIsSuccessOneStepProcess()
      }else{
        ConfirmationPage.doTwoStepProcess()
        ConfirmationPage.doIsSuccessTwoStepProcess()
      }
      passed = true
    })
    after(()=>{
      if(!passed){
        skipFunc()
      }
    })
  })
}

module.exports.borrow = (asset, amount, hasApproval = true, skip = false) =>{
  return describe(`Borrow process for ${asset}`, () => {
    before(function(){
      if(skip){
        this.skip()
      }
    })
    it(`Open ${asset} borrow view`, () => {
      BorrowPage.open()
      BorrowPage.openAssetBorrowPage(asset)
    })
    it(`Set ${amount} borrow amount for ${asset}`, () => {
      InputPage.doRefreshIfConnectStuck()
      InputPage.doSubmitAmount(amount)
      InputPage.doChooseVariableAPR()
    })
    it(`Make approve for ${asset}, on confirmation page`, () => {
      if(hasApproval){
        ConfirmationPage.doOneStepProcess()
        ConfirmationPage.doIsSuccessOneStepProcess()
      }else{
        ConfirmationPage.doTwoStepProcess()
        ConfirmationPage.doIsSuccessTwoStepProcess()
      }
    })
  })
}

module.exports.withdraw = (asset, amount, skip = false) =>{
  return describe(`Borrow process for ${asset}`, () => {
    before(function(){
      if(skip) this.skip()
    })
    it(`Open ${asset} borrow view`, () => {
      DashboardPage.open()
      BorrowPage.openAssetBorrowPage(asset)
    })
    it(`Set ${amount} borrow amount for ${asset}`, () => {
      InputPage.doRefreshIfConnectStuck()
      InputPage.doSubmitAmount(amount)
      InputPage.doChooseVariableAPR()
    })
    it(`Make approve for ${asset}, on confirmation page`, () => {
      ConfirmationPage.doOneStepProcess()
      ConfirmationPage.doIsSuccessOneStepProcess()
    })
  })
}


