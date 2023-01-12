const outerCheck = (innerClick, outerClick, props) => {
  outerClick++;
  if (innerClick + outerClick === 1) {
    props.setIsEditFormOn(false);
  }
  innerClick = 0;
  outerClick = 0;
};
const innerCheck = (innerClick, outerClick) => {
  innerClick = 0;
  outerClick = 0;
  innerClick++;
};

export { outerCheck, innerCheck };
// console.log('out : inner, outer', innerClick, outerClick);
// console.log('inn : inner, outer', innerClick, outerClick);
