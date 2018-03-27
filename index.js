const P = require('bluebird');
const requestAsync = P.promisify(require('request'));

const xpath = require('xpath');
const dom = require('xmldom').DOMParser;


const path = '//html/body/div[3]/div/div[1]/div[3]';
(async () => {
	const listHtml = await requestAsync({
		url:'https://www.detmir.ru/catalog/index/name/progulochnie/',
		gzip: true,
		chunked: true
	});
// const html = listHtml.body.replace('<!DOCTYPE html>', '')
	var doc = new dom().parseFromString(listHtml.body);
	 // console.log(html)
	const nodes = xpath.select(path, doc)
// '/html/body/div[3]/div/div[1]/div[3]/div/div/div[2]/div[4]/div[2]/div[3]/div[1]/a'
	console.log(nodes)
})()
	.catch((e) => {
		console.log(e);
	});
