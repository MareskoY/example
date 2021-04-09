const Page = require('./page');
const elemUtil = require('../util/elementUtil')
const config = require('../../config')
const markets = require('../fixtures/markets.json')

const locators = {
    preloadLoader: "//div[contains(@class, 'Preloader__dots')]",
    connectBtn: "//div[contains(@class, 'Menu__buttons-inner')]//div[contains(@class, 'ConnectButton__inner')]",
    extensionConnectBtn: '//*[text()="Browser Wallet"]',
    marketSelectBtn: "//div[contains(@class, 'Menu__buttons-inner')]//div[contains(@class, 'MarketSwitcher__button-content')]",
    marketsBtnsList:{
      aaveV2ForkBtn: "//div[contains(@class, 'Menu__buttons-inner')]//img[@alt='proto_fork']"
    }
};


class MainPage extends Page {
  get loader () { return $(locators.preloadLoader) }
  get connectBtn () { return $(locators.connectBtn) }
  get extensionConnectBtn () { return $(locators.extensionConnectBtn) }
  get marketSelectBtn () { return $(locators.marketSelectBtn) }
  get aaveV2ForkBtnBurger () { return $(locators.marketsBtnsList.aaveV2ForkBtn) }

  open(path) {
      return super.open(path);
  }

  doSwitchToAave(){
      browser.switchWindow(config.URL)
  }

  doConnectWithMM(){
      elemUtil.doClick(this.connectBtn)
      elemUtil.doClick(this.extensionConnectBtn)
  }

  doWaitLoaderComplete(timeout=30000){
      browser.waitUntil(
        () => $$(locators.preloadLoader).length==0,
        {
          timeout: timeout,
          timeoutMsg: 'loader not compited'
        }
      )
    }

  doWaitLoader(timeout=30000){
    elemUtil.doIsDisplayed(this.loader)
    this.doWaitLoaderComplete()
  }

  doSwitchMarket(marketName){
    elemUtil.doClick(this.marketSelectBtn)
    switch(marketName){
      case(markets.aaveV2Fork):
        elemUtil.doClick(this.aaveV2ForkBtnBurger)
        break;
    }
    browser.pause(1000)
  }

  doDeposit(currency, amount){
      const listRow = '//*[text()="ETH"]'
      const amountInput = '//input[@type="number"]'
      const continueBtn = '//*[text()="Continue"]'
      const depositBtn = '//*[text()="Deposit"]'
      elemUtil.doClick($(listRow))
      elemUtil.doSetValue($(amountInput), amount)
      elemUtil.doClick($(continueBtn))
      elemUtil.doClick($(depositBtn))
  }

}

module.exports = new MainPage();
