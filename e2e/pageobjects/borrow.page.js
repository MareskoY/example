const Page = require('./page');
const MainPage = require('../pageobjects/main.page')
const elemUtil = require('../util/elementUtil')

const locators = {
  table: "//div[contains(@class, 'BasicTable__content-inner')]",
};


class BorrowPage extends Page {
  get assetTable () { return $(locators.table) }

  open() {
    return super.open("/borrow");
  }

  openAssetBorrowPage(assetName){
    MainPage.doWaitLoaderComplete()
    let assetRow = this.assetTable.$("//*[text()='"+assetName+"']/../../../..")
    elemUtil.doClickWithRedirect(assetRow)
  }

}

module.exports = new BorrowPage();
