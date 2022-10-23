const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

// create webscraper
const URL = "https://search.rakuten.co.jp/search/mall/keyboard/";

axios(URL).then((response) => {
    const htmlParser = response.data;
    
    const $ = cheerio.load(htmlParser);
    
    const dataList = $(".searchresultitem", htmlParser).map(function() {
        const title = $(this).find(".title").text();
        const price = $(this).find(".important").text();
       return {title, price};
    });
    console.log(dataList);
}).catch(error => console.log(error));

app.listen(PORT, console.log("server running!"));