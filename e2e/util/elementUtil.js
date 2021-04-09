class ElementUtil{

    doClick(elem, timeout=20000){
        elem.waitForDisplayed({
            timeout: timeout
        })
        elem.waitForClickable({
            timeout: timeout
        })
        elem.click()
    }

    doClickWithRedirect(elem, timeout=20000){
        let oldUrl = browser.getUrl()
        elem.waitForDisplayed()
        elem.waitForClickable()
        elem.click()
        browser.waitUntil(
            () => oldUrl != browser.getUrl(),
            {
                timeout: timeout,
                timeoutMsg: 'expected url to be different'
            }
        )
    }

    doSetValue(elem, value, timeout=20000){
        elem.waitForDisplayed({ timeout: timeout })
        elem.setValue(value)
    }

    doGetText(elem){
        elem.waitForDisplayed()
        return elem.getText()
    }

    doGetPageTitle(){
        return browser.getTitle()
    }

    doIsDisplayed(elem,timeout=20000){
      elem.waitForExist({ timeout: timeout })
      elem.waitForDisplayed()
    }
    doWaitNotExist(path, timeout=20000){
      browser.waitUntil(
        () => $$(path).length == 0,
        {
          timeout: timeout,
          timeoutMsg: 'element is still exist'
        }
      )
    }

    doIsExist(elem,timeout=20000){
        return elem.waitForExist({ timeout: timeout })
    }

    doClearValue(elem){
        elem.doubleClick()
        elem.keys(['Control', 'a'])
        elem.keys('Delete')
    }

    doDropDownSelect(elem, value) {
        elem.waitForDisplayed()
        elem.click()
        browser.pause(1000)
        let valueXpath = '//*[text()="'+value+'"]'
        $(valueXpath).click()
    }
}

module.exports = new ElementUtil()
