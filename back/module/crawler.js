const puppeteer = require('puppeteer');

const crawler = async (address) => {
  const browser = await puppeteer.launch({
    // headless: false,
    slowMo: 30,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // args: ['--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  // await page.setViewport({
  //   width: 1920,
  //   height: 1080,
  // });

  page.on('dialog', async (dialog) => {
    await dialog.dismiss();
  });

  //await Promise.all([ await page.goto('https://address.dawul.co.kr/'),
  //page.waitForNavigation(),
  //]);
  await page.goto('https://address.dawul.co.kr/', {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  });

  // 팝업제거
  const pages = await browser.pages();
  await pages.at(-1).close();

  // 검색
  await page.waitForSelector('#input_juso');
  await page.type('#input_juso', address);
  await page.click('#btnSch');

  // 값 받아오기
  await page.waitForSelector('#insert_data_5');
  let coordinates = await page.evaluate(() => {
    const val = document.querySelector('#insert_data_5');
    return val.textContent;
  });

  await browser.close();
  return coordinates;
};

module.exports = { crawler };
