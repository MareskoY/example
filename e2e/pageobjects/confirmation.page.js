const Page = require('./page');
const MainPage = require('../pageobjects/main.page')
const elemUtil = require('../util/elementUtil')
const MM = require('../../metamask/mm.control')

const locators = {
  submitBtn: "//button[@type='submit']",
  approveBtn: "//button[@type='submit']//*[text()='Approve']",
  successResult: {
    success2Status: "//*[text()='2/2 Success!']",
    success3Status: "//*[text()='3/3 Success!']",
    confirmedStatus: "//*[text()='Confirmed']",
    successMessage:"//*[text()='Your action has been successfully executed']"
  }
};


class ConfirmationPage extends Page {
  get submitBtn() { return $(locators.submitBtn)}
  get successResult_success2Status() { return $(locators.successResult.success2Status)}
  get successResult_success3Status() { return $(locators.successResult.success3Status)}
  get successResult_confirmedStatus() { return $(locators.successResult.confirmedStatus)}
  get successResult_successMessage() { return $(locators.successResult.successMessage)}

  doOneStepProcess() {
    elemUtil.doClick(this.submitBtn)
    MM.doSwitchToMetamaskNotificationWindow()
    MM.doSubmitPayment()
    MainPage.doSwitchToAave()
  }

  doTwoStepProcess() {
    elemUtil.doClick(this.submitBtn)
    MM.doSwitchToMetamaskNotificationWindow()
    MM.doSubmitPayment()
    MainPage.doSwitchToAave()
    elemUtil.doClick(this.submitBtn)
    MM.doSwitchToMetamaskNotificationWindow()
    MM.doSubmitPayment()
    MainPage.doSwitchToAave()
  }

  doIsSuccessOneStepProcess(){
    elemUtil.doIsDisplayed(this.successResult_success2Status)
    elemUtil.doIsDisplayed(this.successResult_confirmedStatus)
    elemUtil.doIsDisplayed(this.successResult_successMessage)
  }

  doIsSuccessTwoStepProcess(){
    elemUtil.doIsDisplayed(this.successResult_success3Status)
    elemUtil.doIsDisplayed(this.successResult_confirmedStatus)
    elemUtil.doIsDisplayed(this.successResult_successMessage)
  }
}

module.exports = new ConfirmationPage();
