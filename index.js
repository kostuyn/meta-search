const P = require('bluebird');
const requestAsync = P.promisify(require('request'));

const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const cheerio = require('cheerio');


const path = '//html/body/div[3]/div/div[1]/div[3]';
const listSelector = 'body > div.global > div > div.container > div.body > div > div > div.catalog > div.catalog_inner.wleft > div.centerb > div.goods_prod_list > div > a';
(async () => {
	const listHtml = await requestAsync({
		url:'https://www.detmir.ru/catalog/index/name/progulochnie/',
		gzip: true,
		chunked: true
	});
//// const html = listHtml.body.replace('<!DOCTYPE html>', '')
// 	var doc = new dom().parseFromString(listHtml.body);
	// // console.log(html)
	// const nodes = xpath.select(path, doc)
// // '/html/body/div[3]/div/div[1]/div[3]/div/div/div[2]/div[4]/div[2]/div[3]/div[1]/a'
// 	console.log(nodes)

	const $ = cheerio.load(listHtml.body);
	const list = $(listSelector);
	// console.log(list.find('a').attr('href'))
	// console.log(list)
// 'body > div.global > div > div.container > div.body > div > div > div.catalog > div.catalog_inner.wleft > div.centerb > div.goods_prod_list > div:nth-child(1) > a'
	const nodes = list.map((i, elem) => {
		console.log('elem', i)
		return $(elem).attr('href');
	}).get();

	 console.log(nodes)
})()
	.catch((e) => {
		console.log(e);
	});
