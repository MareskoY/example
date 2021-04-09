const Page = require('./page');
const elemUtil = require('../util/elementUtil')
const config = require('../../config')
const markets = require('../fixtures/markets.json')

const locators = {
  assetInput: "//input[@type='number']",
  assetInputMaxBtn: "//button[text()='MAX']",
  continueBtn: "//button[@type='submit']",
  APROption:{
    stable:"//*[text()='Stable APR']/../..",
    variable:"//*[text()='Variable APR']/../.."
  },
  errors:{
    walletConnection: '//*[text()="Please connect a wallet"]'
  }
};


class MainPage extends Page {
  get assetInput () { return $(locators.assetInput) }
  get assetInputMaxBtn () { return $(locators.assetInputMaxBtn) }
  get continueBtn () { return $(locators.continueBtn) }
  get APROption_stableBtn () { return $(locators.APROption.stable) }
  get APROption_variableBtn () { return $(locators.APROption.variable) }
  get error_walletConnection () { return $(locators.errors.walletConnection) }

  doSubmitAmount(amount, max=false){
    elemUtil.doSetValue(this.assetInput, amount)
    elemUtil.doClick(this.continueBtn)
  }

  doChooseStableAPR(){
    elemUtil.doClick(this.APROption_stableBtn)
    elemUtil.doClickWithRedirect(this.continueBtn)
  }

  doChooseVariableAPR(){
    elemUtil.doClick(this.APROption_variableBtn)
    elemUtil.doClickWithRedirect(this.continueBtn)
  }

  doRefreshIfConnectStuck(){
    try{
      if(elemUtil.doWaitNotExist(locators.errors.walletConnection, 30000)){
          browser.refresh()
          console.log("refresh")
      }
    }catch(error){}
  }
}

module.exports = new MainPage();
