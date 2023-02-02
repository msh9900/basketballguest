const temp = [
  { id: 1, name: '서울 토성로 38-6', offsetX: 127.112864, offsetY: 37.5293841 },
  {
    id: 2,
    name: '경기도 성남시 수정구 ',
    offsetX: 127.127097,
    offsetY: 37.4488383,
  },
  {
    id: 3,
    name: '부산광역시 해운대구 중동 산3-9',
    offsetX: 129.19626,
    offsetY: 35.1642243,
  },
  {
    id: 4,
    name: '제주특별자치도 제주시 조천읍 신북로 491-9 2층',
    offsetX: 126.663087,
    offsetY: 33.5438099,
  },
  {
    id: 5,
    name: '대구광역시 중구 공평로 88',
    offsetX: 128.601501,
    offsetY: 35.8715288,
  },
];

// 서울 토성로 38-6
// X :127.112864, Y :37.5293841

// 경기도 성남시 수정구
// X :127.127097, Y :37.4488383

// 부산광역시 해운대구 중동 산3-9
// X :129.196260, Y :35.1642243

// 주소: 제주특별자치도 제주시 조천읍 신북로 491-9 2층
// X :126.663087, Y :33.5438099

// 대구광역시 중구 공평로 88
// X :128.601501, Y :35.8715288

const standardX = 127.112864;
const standardY = 37.5293841;

const getDistanceSort = temp.sort(function (a, b) {
  const ax = Math.pow(standardX - a.offsetX, 2);
  const ay = Math.pow(standardY - a.offsetY, 2);
  const bx = Math.pow(standardX - b.offsetX, 2);
  const by = Math.pow(standardY - b.offsetY, 2);
  const aVal = Math.pow(ax + ay, 0.5);
  const bVal = Math.pow(bx + by, 0.5);
  console.log(aVal);
  return aVal - bVal;
});

console.log(getDistanceSort);
