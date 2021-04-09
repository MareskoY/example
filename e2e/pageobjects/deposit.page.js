const Page = require('./page');
const MainPage = require('../pageobjects/main.page')
const elemUtil = require('../util/elementUtil')
const config = require('../../config')
const markets = require('../fixtures/markets.json')

const locators = {
  table: "//div[contains(@class, 'BasicTable__content-inner')]",
};


class DepositPage extends Page {
  get assetTable () { return $(locators.table) }


  open() {
    return super.open("/deposit");
  }

  openAssetDepositPage(assetName){
    MainPage.doWaitLoaderComplete()
    let assetRow = this.assetTable.$("//*[text()='"+assetName+"']/../../../..")
    elemUtil.doClickWithRedirect(assetRow)
  }

}

module.exports = new DepositPage();
