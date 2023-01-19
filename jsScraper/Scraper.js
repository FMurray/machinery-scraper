const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let scrapedData = [];
(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    try{
        await page.goto('http://i-know-you-faked-user-agent.glitch.me/',{waitUntil: 'networkidle2'}).then(
            console.log("Page loaded")
        )
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator,'platform',{get:()=>'Linux x86_64'})
            Object.defineProperty(navigator,'productSub',{get:()=>'20030107'})
            Object.defineProperty(navigator,'vendor',{get:()=>'Google Inc.'})
            Object.defineProperty(navigator,'oscpu',{get:()=>undefined})
            Object.defineProperty(navigator,'cpuClass',{get:()=>undefined})
        });
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36');
        /*  const body = await page.evaluate(() => 
            document.body.innerHTML); 
            let $ = cheerio.load(body);
            let title = $(".listing-portion-title").text();
            let currentBid = $(".auction-price").text();
            scrapedData.push({"title":title, "currentBid":currentBid}); */
        }

    catch(err){
        console.log(err);
    }
    await browser.close();
console.log(scrapedData)}
    )();