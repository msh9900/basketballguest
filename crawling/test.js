// import puppeteer from "puppeteer";
const puppeteer = require("puppeteer");

const crawlingTest = async (address) => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    args: ["--window-size=1920,1080"],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  page.on("dialog", async (dialog) => {
    // console.log(dialog.message());
    await dialog.dismiss();
  });

  await Promise.all([
    page.goto("https://address.dawul.co.kr/"),
    page.waitForNavigation(),
  ]);

  // 팝업제거
  const pages = await browser.pages();
  await pages.at(-1).close();

  // 검색
  await page.waitForSelector("#input_juso");
  await page.type("#input_juso", address);
  await page.click("#btnSch");

  // 값 받아오기
  await page.waitForSelector("#insert_data_5");
  let coordinates = await page.evaluate(() => {
    val = document.querySelector("#insert_data_5").textContent;
    return val;
  });

  await browser.close();
  return coordinates;
};

const address = "서울 토성로 38-6";
const coordinates = await crawlingTest(address);
let trimmed = await coordinates.replace(/ /g, "");
const v = await trimmed.split(",");
const [offsetX, offsetY] = [v[0].slice(2), v[1].slice(2)];
console.log(offsetX, offsetY);
