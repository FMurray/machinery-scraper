
import scrapy
from scrapy_playwright.page import PageMethod

class ListingsSpider(scrapy.Spider):
    name = "listings"

    def start_requests(self):
        # urls = [
        #     'https://www.machinerytrader.com/listings/search?page=1',
        #     'https://www.machinerytrader.com/listings/search?page=2'
        # ]
        # for url in urls:
        #     yield scrapy.Request(url, meta={'playwright': True, 'playwright_include_page': True})

        url = 'https://www.machinerytrader.com/listings/search?page=1'
        # for url in urls: 
        yield scrapy.Request(url, meta=dict(
                playwright = True,
                playwright_include_page = True, 
                playwright_page_methods =[
          PageMethod("wait_for_selector", "#listContainer"),
          ]
            ))

    async def parse(self, response):
        page = response.url.split("=")[-1]
        # # with open(filename, 'wb') as f:
        # #     f.write(response.body)
        # # self.log(f'Saved file {filename}')
        # titles = []
        # for listing in response.css('div.listing-data-selector'):
        #     title = listing.css('h3.listing-portion-title').get() 
        #     titles.append(title)
        
        # filename = f'listings-{page}.html'
        # with open(filename, 'wb') as f:
        #     f.write(bytes(titles))

        page = response.meta["playwright_page"]
        screenshot = await page.screenshot(path=f"page-{page}.png", full_page=True)
        # screenshot contains the image's bytes
        await page.close()