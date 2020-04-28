const rp = require("request-promise");
const cheerio = require("cheerio");
const axios = require("axios").default;

const instance = axios.create({
  baseURL: "https://ame-team25.herokuapp.com/v1/graphql",
  timeout: 1000,
  headers: { "x-hasura-admin-secret": "xxx" },
});

let url = "#";

function capture(url) {
  let obj_Lista_Produtos = [];

  const options = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  rp(options)
    .then(($) => {
      //$('.product-grid-item span').each((i, item) => {
      $(".product-grid-item").each((i, item) => {
        //console.log($(item).find('.tabela-times-time-nome').text())

        let obj_Produto = {
          name: " ",
          price: " ",
        };
        //console.log($(item).find('span').length)

        //console.log($(item).text())
        $(item)
          .find("span")
          .each((i2, item2) => {
            if ($(item2).attr("class").startsWith("ProductCard__ProductName")) {
              obj_Produto.name = $(item2).text();
            } else if (
              $(item2).attr("class").startsWith("ProductCard__Price")
            ) {
              obj_Produto.price = $(item2)
                .text()
                .replace("R$ ", "")
                .replace(",", ".");
            }
            //console.log($(item2).attr('class'), )
          });

        instance({
          method: "post",
          url: "",
          data: {
            query: `
        mutation MyMutation {
          insert_products(objects: {
            name: "${obj_Produto.name}", 
            price: "${obj_Produto.price}", 
          }) {
            affected_rows
          }
        }
        `,
          },
        })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            // always executed
          });

        obj_Lista_Produtos.push(obj_Produto);
      });

      console.log(JSON.stringify(obj_Lista_Produtos));
    })
    .catch((err) => {
      console.log(err);
    });
}

for (let i = 1; i < 11; i++) {
  capture(
    url +
      `?limite=${24 * i}&amp;offset=${24 * (i - 1)}&amp;ordenacao=lowerPrice`
  );
}
