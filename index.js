const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']    
    });
    const page = await browser.newPage();
    // login
    await page.goto('http://10.10.30.123');
    await page.type('#login_user', 'admin')
    await page.type('#login_psw', 'admin123')
    await page.click('a.fn-width80:nth-child(1)')
    await page.waitFor(1000)
    //await page.screenshot({path: '1.png'});
    
    // 点击'设置'
    await page.click('.main > li:nth-child(4) > a:nth-child(1)')
    await page.waitFor(1000)
    //await page.screenshot({path: '2.png'});
    
    // 点击'系统管理'
    await page.click('#set-menu > li:nth-child(5) > a:nth-child(1)')
    await page.waitFor(1000)
    //await page.screenshot({path: '3.png'});
    
    // 点击'系统管理'>'本机设置'
    await page.click('#set-menu > li:nth-child(5) > ul:nth-child(2) > li:nth-child(1)')
    await page.waitFor(1000)
    //await page.screenshot({path: '4.png'});
 
    // 点击'系统管理'>'本机设置'>'日期时间'
    await page.click('#page_generalConfig > ul:nth-child(2) > li:nth-child(2)')
    await page.waitFor(1000)
    //await page.screenshot({path: '5.png'});
    
    while (1) {
        await page.waitFor(500);
        const result = await page.evaluate(() => {
            let hour = document.querySelector('#gen_sysTime > input:nth-child(1)').value;
            let minute = document.querySelector('#gen_sysTime > input:nth-child(3)').value;
            let second = document.querySelector('#gen_sysTime > input:nth-child(5)').value;
            return {
                hour,
                minute,
                second
            }
        });
        console.log(result);
    }
};

scrape();
