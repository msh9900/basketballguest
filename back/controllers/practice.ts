const temp = [
  { id: 1, offsetX: 37, offsetY: 127 },
  { id: 2, offsetX: 36, offsetY: 127 },
  { id: 3, offsetX: 37, offsetY: 124 },
];
const standardX = 37;
const standardY = 127;

const getDistanceSort = temp.sort(function (a, b) {
  const ax = Math.pow(standardX - a.offsetX, 2);
  const ay = Math.pow(standardY - a.offsetY, 2);
  const bx = Math.pow(standardX - b.offsetX, 2);
  const by = Math.pow(standardY - b.offsetY, 2);
  const aVal = Math.pow(ax + ay, 0.5);
  const bVal = Math.pow(bx + by, 0.5);
  return aVal - bVal;
});

console.log(getDistanceSort);
