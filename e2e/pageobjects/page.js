const config = require('../../config');
const elemUtil = require('../util/elementUtil')

module.exports = class Page {
    open (path) {
        if(path){
            return browser.url(config.URL+`${path}`)
        }else{
            return browser.url(config.URL)
        }
    }
    doSetupLocalStorage(key, value){
      browser.execute("localStorage.setItem('fork_enabled', 'true')");
      browser.refresh();
    }
    doTextIsDisplayed(text, timeout = 10000){
        let xpath = `//*[text()="${text}"]`
        $(xpath).waitForExist({timeout:timeout})
        expect($(xpath).isExisting()).to.be.equal(true)
    }
    doCheckUrlIs(expectedUrl){
        expect(browser.getUrl()).to.be.equal(expectedUrl)
    }
    doOpenNewTab(url){
        browser.newWindow(url)
    }
    doSwitchToTab(urlOrTitleToMatch){
        browser.switchWindow(urlOrTitleToMatch)
    }
    doCloseTab(){
        browser.closeWindow()
    }
    doCheckUrlIs(expectedUrl){
        expect(browser.getUrl()).to.be.equal(expectedUrl)
    }
    doIsTextDisplay(text){
        let xpath = `//*[text()="${text}"]`
        let count = $$(xpath).length
        if(count > 0)
            return true
        else
            return false
    }
    doSetSize(width,height){
        browser.setWindowSize(width,height)
    }
}
