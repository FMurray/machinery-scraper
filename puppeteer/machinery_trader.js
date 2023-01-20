
const cheerio = require('cheerio');
const  puppeteer = require('puppeteer');

let scrapedData = [];
(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    try{
        await page.goto('https://www.machinerytrader.com/listings/for-sale/skid-steers/1055',{waitUntil: 'networkidle2'});
        let data = await page.evaluate(() => {document.body.innerHTML});
        const $ = cheerio.load(data);
        let title = $(".listing-portion-title").text();
        let currentBid = $(".auction-price").text();
        scrapedData.push({"title":title, "currentBid":currentBid});
        }
    catch(err){
        console.log(err);
    }
    await browser.close();
console.log(scrapedData)}
    )();