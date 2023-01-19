const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const userAgentUrl= 'http://i-know-you-faked-user-agent.glitch.me/';
const bookScraperUrl ='https://books.toscrape.com'


let scrapedData = [];
(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const fakeUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
    await page.setUserAgent(fakeUserAgent);//set user agent
    await page.goto(bookScraperUrl,{waitUntil: 'domcontentloaded'})//wait until domcontentloaded
    const body = await page.evaluate(() => //evaluate is a puppeteer method that allows you to execute javascript in the browser
        document.body.innerHTML);
    let $ = cheerio.load(body);//load body into cheerio
    let titles = $("h3"); ///cheerio method to select elements
    titles.each((index,element) => { ///cheerio method to iterate over a collection of elements
      let title = $(element).text();    //get innerText of element
        scrapedData.push({"title":title});//push to array
    });
    let nextButton = $("li.next > a");
    if(nextButton.length > 0){
        /* 
        TODO:
        1. Get the href attribute of the next button
        2. Go to the next page
        3. Repeat the above steps
         */
    }
    await browser.close();
    console.log(scrapedData)
})
();