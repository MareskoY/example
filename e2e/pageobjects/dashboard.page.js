const Page = require('./page');
const MainPage = require('../pageobjects/main.page')
const elemUtil = require('../util/elementUtil')

const locators = {
  depositTable: "//div[contains(@class, 'MainDashboardTable__left-inner')]",
  borrowsTable: "//div[contains(@class, 'MainDashboardTable__right-inner')]",
};

class DashboardPage extends Page {
  get depositTable () { return $(locators.depositTable) }
  get borrowsTable () { return $(locators.borrowsTable) }

  open() {
    return super.open("/dashboard");
  }

  doOpenWithdrawView(asset){
    let assetRow = this.assetTable.$("//*[text()='"+asset+"']/../../../..")
    let withdrawBtn = assetRow.$()
  }

  doGetBalanceValue(asset){
    let assetRow = this.assetTable.$("//*[text()='"+asset+"']/../../../..")
    let balanceBox = assetRow.$("//p[contains(@class, 'Value__value')]")
    let balanceValue =  elemUtil.doGetText(balanceBox)
    return balanceValue
  }

  doGetCollateralValue(asset){
    let assetRow = this.assetTable.$("//*[text()='"+asset+"']/../../../..")
    let collateralBox = assetRow.$("//p[contains(@class, 'Switcher__label')]")
    let collateralValue =  elemUtil.doGetText(collateralBox)
    return collateralValue
  }

  doGetBorrowedValue(asset){
    let assetRow = this.assetTable.$("//*[text()='"+asset+"']/../../../..")
    let borrowedBox = assetRow.$("//p[contains(@class, 'Value__value')]")
    let borrowedValue =  elemUtil.doGetText(borrowedBox)
    return borrowedValue
  }

  doGetAPRTypeValue(asset){
    let assetRow = this.assetTable.$("//*[text()='"+asset+"']/../../../..")
    let aprBox = assetRow.$("//p[contains(@class, 'Switcher__label')]")
    let aprValue =  elemUtil.doGetText(aprBox)
    return aprValue
  }

  doCheckDepositValue(asset, balance, isCollateral){
    let balanceValue = Math.floor(parseFloat(
      this.doGetBalanceValue(asset).replace(/,/g, "")
    ))
    let collateralValue = this.doGetCollateralValue(asset)
    expect(balance).to.be.equal(balanceValue, "Balance incorrect")
    expect(isCollateral).to.be.equal(collateralValue, "Collateral incorrect")
  }

  doCheckBorrowValue(asset, borrowed, aprType){
    let balanceValue = Math.floor(parseFloat(
      this.doGetBorrowedValue(asset).replace(/,/g, "")
    ))
    let collateralValue = this.doGetAPRTypeValue(asset)
    expect(borrowed).to.be.equal(balanceValue, "Borrowed incorrect")
    expect(aprType).to.be.equal(collateralValue, "APR type incorrect")
  }

}

module.exports = new DashboardPage();
