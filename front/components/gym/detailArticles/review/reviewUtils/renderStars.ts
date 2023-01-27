import React from 'react'

// 별 찍기
const renderStars = (str: string) => {
  const num = Number(str);
  const Blacks = Math.floor(num);
  const half = num === Math.floor(num) ? 0 : 1;
  const Whites = 5 - Blacks - half;
  const ele = []

  for (let index = 0; index < Blacks; index++) {
    ele.push(React.createElement('span', {key: Math.random()}, `★`));
  }
  if (half !== 0) {
    ele.push(React.createElement('span', {key: Math.random()}, `✭`));
  }
  for (let index = 0; index < Whites; index++) {
    ele.push(React.createElement('span', {key: Math.random()}, `✩`));
  }
  return ele;
};

export default renderStars