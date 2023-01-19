const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const userAgentUrl= 'http://i-know-you-faked-user-agent.glitch.me/';
const bookScraperUrl ='https://books.toscrape.com'
//let scrapedData = [];
/* (async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const fakeUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    try{
        
         await page.evaluateOnNewDocument(() => {
            let open = window.open;
            window.open = (...args) => {
                console.log(...args)
                let newPage = open(...args);
                Object.defineProperty(newPage.navigator, 'userAgent',{ get: ()=> fakeUserAgent});
                return newPage;
            }
            window.open.toString=()=> 'function open() { [native code] }';
        },fakeUserAgent); 
        await page.setUserAgent(fakeUserAgent);
        await page.goto('http://www.i-know-you-faked-user-agent.glitch.me/new-window',{waitUntil: 'domcontentloaded'}).then(
            console.log("Page loaded")
        )
          const body = await page.evaluate(() => 
            document.body.innerHTML); 
            let $ = cheerio.load(body);
            let title = $(".listing-portion-title").text();
            let currentBid = $(".auction-price").text();
            scrapedData.push({"title":title, "currentBid":currentBid}); 
        }

    catch(err){
        console.log(err);
    }
    //await browser.close();
console.log(scrapedData)}
    )(); */


/* let scrapedData = [];
(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const fakeUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    try{
       
        await page.setUserAgent(fakeUserAgent);
        await page.goto(bookSraperUrl,{waitUntil: 'domcontentloaded'}).then(
            console.log("Page loaded")
        )
        const body = await page.evaluate(() => 
            document.body.innerHTML); 
            let $ = cheerio.load(body);
            let title = $(".listing-portion-title").text();
            let currentBid = $(".auction-price").text();
            scrapedData.push({"title":title, "currentBid":currentBid}); 
        }

    catch(err){
        console.log(err);
    }
    await browser.close();
console.log(scrapedData)}
)(); */

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
    let title = $("h3").text();
    scrapedData.push({"titles":title});
    await browser.close();
    console.log(scrapedData)
})
();