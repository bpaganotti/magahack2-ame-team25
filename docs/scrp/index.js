const rp = require('request-promise')
const cheerio = require('cheerio')

const options = {
    uri: 'https://www.americanas.com.br/lojas-proximas/33014556000196/L683',
    transform: function (body) {
      return cheerio.load(body)
    }
  }

  rp(options)
  .then(($) => {
    $('.product-grid-item').each((i, item) => {
      //console.log($(item).find('.tabela-times-time-nome').text())
      console.log($(item).text())
    })
  })
  .catch((err) => {
    console.log(err);
  })