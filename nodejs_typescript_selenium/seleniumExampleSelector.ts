import {Builder, By, Key, until} from 'selenium-webdriver';
class TestSelenium{
    constructor(){
        
    }

    async test() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('https://docs.python.org/3/');
            await driver.sleep(500);

            var selector = await driver.findElement(By.xpath("//option[contains(text(),'3.6')]/ancestor::select"));
            await selector.click()

            await driver.sleep(500); 
            var option = await driver.findElement(By.xpath("//option[contains(text(),'3.6')]"));
            await option.click()

            await driver.sleep(10000);
            
          } finally {
            await driver.quit();
          }
    }

}

let test = new TestSelenium()
test.test()
