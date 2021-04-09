const MM = require('../../metamask/mm.control')
const MainPage = require('../pageobjects/main.page')
const Page = require('../pageobjects/page')
const DepositPage = require('../pageobjects/deposit.page')
const InputPage = require('../pageobjects/input.page')
const ConfirmationPage = require('../pageobjects/confirmation.page')

const markets = require('../fixtures/markets.json')

let configMM=(network, privateKey)=>{
  MM.doMainSetup()
  MM.doSwitchNetwork(network)
  MM.doImportAccount(privateKey)
  // MM.doTransferBetweenWallets("Account 1", 1000)
  // MM.doSwitchAccount("Account 1")
  // MM.doWaitBalanceChangeTo(1000,20000)
  // MM.doCloseMetamaskTab()
  browser.closeWindow()
}

let configAave=()=>{
  const page = new Page();
  MainPage.doSwitchToAave()
  page.doSetupLocalStorage('fork_enabled', 'true')
  MainPage.doSwitchMarket(markets.aaveV2Fork)
  MainPage.doConnectWithMM()
  MM.doSwitchToMetamaskNotificationWindow()
  MM.doConnect()
  MainPage.doSwitchToAave()
}

module.exports.configTest = (network, privateKey) => {
  before(()=>{
    MainPage.open()
    configMM(network, privateKey)
    configAave()
    console.log("main setup successfully done")
  })
  after(()=>{
  })
}
