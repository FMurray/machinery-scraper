
import scrapy

class ListingsSpider(scrapy.Spider):
    name = "listings"

    def start_requests(self):
        urls = [
            'https://www.machinerytrader.com/listings',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = f'listings.html'
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log(f'Saved file {filename}')