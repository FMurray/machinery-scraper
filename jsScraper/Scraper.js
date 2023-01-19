const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const userAgentUrl= 'http://i-know-you-faked-user-agent.glitch.me/';
const bookScraperUrl ='https://books.toscrape.com'


let scrapedData = [];
(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const fakeUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    await page.setUserAgent(fakeUserAgent);
    await page.goto(bookScraperUrl,{waitUntil: 'domcontentloaded'})
    const body = await page.evaluate(() =>
        document.body.innerHTML);
    let $ = cheerio.load(body);
    let titles = $("h3");
    titles.each((index,element) => {
      let title = $(element).text();
        scrapedData.push({"title":title});
    });
    await browser.close();
    console.log(scrapedData)
})
();