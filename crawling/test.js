import puppeteer from "puppeteer";
// const puppeteer = require("puppeteer");

const crawlingTest = async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();
  await page.goto("https://address.dawul.co.kr/");
  const address = "서울 토성로 38-6";

  // 주소 검색
  await page.evaluate(() => {
    document.querySelector("input_juso").value = address;
  });
  // await page.evaluate((addr) => {
  //   const dom = document.querySelector("#input_juso");
  //   dom.value = addr;
  // }, address);

  await page.click("#btnSch"); // 검색버튼 클릭
  await page.waitFor(500); // 5초

  await page.waitForSelector("#insert_data_5");
  const td = document.querySelector("#insert_data_5");
  const coordinates = td.value;

  await browser.close(); // 브라우저 종료
  return coordinates;
};

// const address = "서울 토성로 38-6";
const crawlingResult = crawlingTest();
console.log(crawlingResult);
