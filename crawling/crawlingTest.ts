import puppeteer from 'puppeteer';

const crawlingTest = async (address:string) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();
  await page.goto('https://address.dawul.co.kr/',);
  await page.evaluate(() => {
    const dom = document.querySelector('#input_juso') as HTMLInputElement
    dom.value = address
  });

  await page.evaluate((addr:any) => {
    // document.querySelector('#input_juso').value = addr
    const dom = document.querySelector('#input_juso') as HTMLInputElement
    dom.value = addr
    }, address);

  // ※ 주소전환은 대표지번을 기준으로 전환됩니다.
  // ※ 위 좌표는 WGS-84좌표계입니다.

  await page.click('#btnSch') // 검색버튼 클릭
  
  // await page.waitFor(500) // 5초
  
  await page.waitForSelector('#insert_data_5') 
  const td = document.querySelector('#insert_data_5') as any
  const coordinates = td.value

  await browser.close();  // 브라우저 종료
  return coordinates;
};

export default crawlingTest

// 크롤링 테스트
// const address = '서울 토성로 38-6'
// const crawlingResult = crawlingTest(address)
// console.log(crawlingResult);