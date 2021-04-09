const elemUtil = require('../util/element.util')

const locators = {
    setup:{
        startSetupBtn:'//*[text()="Get Started"]',
        importWalletBtn:'//*[text()="Import wallet"]',
        agreeBtn:'//*[text()="I Agree"]',
        importWindow:{
            seedPhraseInput: '//*[@placeholder="Paste seed phrase from clipboard"]',
            password: '//*[@id="password"]',
            confirmPassword: '//*[@id="confirm-password"]',
            termsAgree: '//*[@class="first-time-flow__checkbox first-time-flow__terms"]',
            importBtn: '//*[text()="Import"]'
        },
        allDoneBtn: '//*[text()="All Done"]',
    },
    closePopUpBtn: '//*[@title="Close"]',
    network:{
        listBtn:'//*[@class="network-indicator"]',
        ropstenLI:'//*[text()="Ropsten Test Network"]'
    },
    account:{
        accountIcon:'//*[@class="identicon__address-wrapper"]',
        menuImportAccount:'//*[text()="Import Account"]',
        keyInput:'//*[@id="private-key-box"]',
        importBtn:'//button[text()="Import"]'
    },
    addToken:{
        AddTokenBtn:'//button[text()="Add Token"]',
        CustomTokenTab:'//*[text()="Custom Token"]',
        CustomAddressInput:'//*[@id="custom-address"]',
        NextBtn:'//*[text()="Next"]',
        ConfirmBtn:'//button[text()="Add Tokens"]',
    },
    payment:{
        form:{
            addressInput: '//*[@data-testid="ens-input"]',
            amountInput: '//*[@class="unit-input__input-container"]/input',
            nextBtn: "//button[text()='Next']",
            confirmBtn: '//*[text()="Confirm"]'
        }
    },
    integratePopUp:{
        nextBtn: '//*[text()="Next"]',
        connectBtn: '//*[text()="Connect"]',
    },
    paymentPopUp:{
        confirmBtn: '//*[text()="Confirm"]',
        rejectBtn: '//*[text()="Reject"]'
    },
    mainPage:{
      sendBtn:'//*[text()="Send"]'
    },
    transfer:{
      betweenAccountsBtn:'//*[text()="Transfer between my accounts"]'
    },
    currentBalanceText:'//*[@class="currency-display-component__text"]'
};


class MetamaskPage {

    get setupStartSetupBtn() { return $(locators.setup.startSetupBtn) }
    get setupImportWalletBtn() { return $(locators.setup.importWalletBtn) }
    get setupAgreeBtn() { return $(locators.setup.agreeBtn) }
    get setupImportSeedPhraseInput() { return $(locators.setup.importWindow.seedPhraseInput) }
    get setupImportSeedPassword() { return $(locators.setup.importWindow.password) }
    get setupImportSeedConfirmPassword() { return $(locators.setup.importWindow.confirmPassword) }
    get setupImportSeedTermsAgree() { return $(locators.setup.importWindow.termsAgree) }
    get setupImportSeedImportBtn() { return $(locators.setup.importWindow.importBtn) }
    get setupAllDoneBtn() { return $(locators.setup.allDoneBtn) }

    get closePopUpBtn() { return $(locators.closePopUpBtn) }

    get networkListBtn() { return $(locators.network.listBtn) }
    get networkRopstenLI() { return $(locators.network.ropstenLI) }

    get accountAccountIcon() { return $(locators.account.accountIcon) }
    get accountMenuImportAccount() { return $(locators.account.menuImportAccount) }
    get accountKeyInput() { return $(locators.account.keyInput) }
    get accountImportBtn() { return $(locators.account.importBtn) }

    get addTokenAddTokenBtn() { return $(locators.addToken.AddTokenBtn) }
    get addTokenCustomTokenTab() { return $(locators.addToken.CustomTokenTab) }
    get addTokenCustomAddressInput() { return $(locators.addToken.CustomAddressInput) }
    get addTokenNextBtn() { return $(locators.addToken.NextBtn) }
    get addTokenConfirmBtn() { return $(locators.addToken.ConfirmBtn) }

    get paymentFormAddressInput() {return $(locators.payment.form.addressInput)}
    get paymentFormAmountInput() {return $(locators.payment.form.amountInput)}
    get paymentFormNextBtn() {return $(locators.payment.form.nextBtn)}
    get paymentFormConfirmBtn() {return $(locators.payment.form.confirmBtn)}

    get integratePopUpNextBtn() { return $(locators.integratePopUp.nextBtn) }
    get integratePopUpConnectBtn() { return $(locators.integratePopUp.connectBtn) }

    get paymentPopUpConfirmBtn() { return $(locators.paymentPopUp.confirmBtn) }
    get paymentPopUpRejectBtn() {return $(locators.paymentPopUp.rejectBtn)}

    get mainPageSendBtn() { return $(locators.mainPage.sendBtn) }

    get transferBtwnAccountsBtn(){ return $(locators.transfer.betweenAccountsBtn)}

    get currentBalance(){return $(locators.currentBalanceText)}

    doSwitchToMetamaskTab() {
        this.doSwitchToTab('chrome-extension');
      browser.switchWindow(urlOrTitleToMatch)
    }

    mainSetup(){
        browser.switchWindow('MetaMask')
        elemUtil.doClick(this.setupStartSetupBtn)
        elemUtil.doClick(this.setupImportWalletBtn)
        elemUtil.doClick(this.setupAgreeBtn)
        elemUtil.doSetValue(this.setupImportSeedPhraseInput, data.seedPhrase)
        elemUtil.doSetValue(this.setupImportSeedPassword, data.password)
        elemUtil.doSetValue(this.setupImportSeedConfirmPassword, data.password)
        elemUtil.doClick(this.setupImportSeedTermsAgree)
        elemUtil.doClickWithRedirect(this.setupImportSeedImportBtn)
        elemUtil.doClickWithRedirect(this.setupAllDoneBtn)
        elemUtil.doClick(this.closePopUpBtn)
    }

    closePopup(){
        elemUtil.doClick(this.closePopUpBtn)
    }

    doSetupProfile(){
        this.doSwitchNetwork("Localhost 8545")
        this.doImportAccount()
    }

    switchNetwork(name){
        elemUtil.doClick(this.networkListBtn)
        let liXpath = '//li//*[text()="'+name+'"]'
        elemUtil.doClick($(liXpath))
    }

    importAccount(privatKey){
        elemUtil.doClick(this.accountAccountIcon)
        elemUtil.doClick(this.accountMenuImportAccount)
        elemUtil.doSetValue(this.accountKeyInput, )
        elemUtil.doClick(this.accountImportBtn)
    }

    addToken(contract){
        elemUtil.doClickWithRedirect(this.addTokenAddTokenBtn)
        elemUtil.doClick(this.addTokenCustomTokenTab)
        elemUtil.doSetValue(this.addTokenCustomAddressInput, contract)
        browser.pause(3000)
        elemUtil.doClickWithRedirect(this.addTokenNextBtn)
        browser.pause(3000)
        elemUtil.doClickWithRedirect(this.addTokenConfirmBtn)
        browser.pause(3000)
    }

    connect(){
        elemUtil.doClick(this.integratePopUpNextBtn)
        elemUtil.doClick(this.integratePopUpConnectBtn)
    }

    switchToMetamaskNotificationWindow(){
        browser.switchWindow("MetaMask Notification")
    }
}

module.exports = new MetamaskPage();
