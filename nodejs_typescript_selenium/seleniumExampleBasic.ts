import {Builder, By, Key, until} from 'selenium-webdriver';
class TestSelenium{
    constructor(){
        
    }

    async test() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('https://www.eldiario.es/');
            var aElements = await driver.findElements(By.className('edistnd-lnk'))
            await aElements[0].click()

            var hazteSocioButton = await driver.findElement(By.xpath("//a[contains(@title, 'Hazte socio. Hazte socia del diario.es')]"))
            await hazteSocioButton.click()

            var hazteSocioButton = await driver.findElement(By.xpath("//a/div/p[contains(text(),'ÚNETE')]/ancestor::div/ancestor::a"))
            await hazteSocioButton.click()

            await driver.wait(()=>{},10000);
            //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
            //await driver.wait(until.titleIs('webdriver - Google Search'), 1000);

          } finally {
            await driver.quit();
          }
    }

}

let test = new TestSelenium()
test.test()
