const puppeteer = require('puppeteer')
const rp = require("request-promise");
const axios = require("axios").default;
 
const instance = axios.create({
  baseURL: "https://ame-team25.herokuapp.com/v1/graphql",
  timeout: 1000,
  headers: { "x-hasura-admin-secret": "HdT!HwfAMEDWAQ#team25Lt" },
});

//let url = "https://www.americanas.com.br/lojas-proximas/33014556000196/L683?limite=24&offset=24&ordenacao=lowerPrice";
async function scrapeInfiniteScrollItems(
    page,
    //extractItems,
    //itemTargetCount,
    scrollDelay = 200,
  ) {

    // let items = [];
    // try {
    //   let previousHeight;
    //   while (items.length < itemTargetCount) {
    //     //items = await page.evaluate(extractItems);
    //     previousHeight = await page.evaluate('document.body.scrollHeight');
    //     await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    //     await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
    //     await page.waitFor(scrollDelay);
    //   }
    // } catch(e) { }
    // return items;


    //let items = [];
    try {
      let previousHeight;
      scrollHeight = await page.evaluate('document.body.scrollHeight');

      let index = 0;
      while (index < scrollHeight) {
        await page.evaluate(`window.scrollTo(0, ${index})`);
        await page.waitForFunction(`document.body.scrollHeight > ${index}`);
        await page.waitFor(scrollDelay);
        //await page.waitFor(1000)
        index= index+250;
      }

     
      //while ( previousHeight >= scrollHeight) {
        //items = await page.evaluate(extractItems);
        // previousHeight = await page.evaluate('document.body.scrollHeight');
        // await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
        // await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
        // await page.waitFor(scrollDelay);
      //}
    } catch(e) { }
    //return items;
  }

let scrape = async (pageNumber) => {

  console.log('page', pageNumber);

  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  page.setViewport({ width: 1280, height: 926 });
  await page.goto(`https://www.americanas.com.br/lojas-proximas/33014556000196/L683?limite=${pageNumber*24}&offset=${(pageNumber-1)*24}&ordenacao=lowerPrice`)
  
  // Scroll and extract items from the page.
  const items = await scrapeInfiniteScrollItems(page);
  
  //await page.waitFor(1000)
  
  // Scrape
  const result = await page.evaluate(() => {

    
    window.scrollBy(0, window.innerHeight);
    let products = []
    document.querySelectorAll('.product-grid-item')
    .forEach(item => {
    
        let product = {}

        item.querySelectorAll('span')
            .forEach(x => {
                if (x.className.startsWith('ProductCard__ProductName')) {
                    product.name = x.innerHTML;
                }
                else if (x.className.startsWith('ProductCard__Price')) {
                    product.price = x.innerHTML.replace("R$ ", "").replace(",", ".");
                }
            })

        item.querySelectorAll('picture img')
                    .forEach(x => {
                        product.img = x.src
                    })

        item.querySelectorAll('picture source')
                    .forEach(x => 
                        {
                            if( product.sku == undefined ){
                                let lst_sku = x.srcset.split(`/`)[x.srcset.split(`/`).length-1].split(`_`);

                                product.sku = lst_sku[0];
                            }
                        });

        products.push(product);
    })

    return products;
  });
  
  browser.close()
  return result
};


let main = async () => {

  for (let index = 101; index <= 200; index++) {
    await scrape(index).then((value) => {
      console.log(value) // sucesso!
      value.forEach(product => {
        instance({
          method: "post",
          url: "",
          data: {
            query: `
            mutation MyMutation {
              insert_products(objects: {
                id: ${product.sku}
                name: "${product.name}", 
                img: "${product.img}"
                price: "${product.price}", 
              }) {
                affected_rows
              }
            }
        `,
          },
        })
          .then(function (response) {
            console.log(response.data, product);
          })
          .catch(function (error) {
            console.log(error, product);
          })
          .finally(function () {
            // always executed
          });
      })
  })
  }

}

main();