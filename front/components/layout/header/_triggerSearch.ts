// GLOBAL STATE

import { search } from "redux/modules/search";
const triggerSearch = (searchValue:string, selectValue:string, router:any , dispatch:any) => {

  // 1. CHANGE STATE
  const stateObj = {
    searchValue,
    globalSearchNeeded: true,
  };
  dispatch(search(stateObj));

  // 2. MOVE TO TARGET PAGE
  if (selectValue == "체육관대여") {
    router.push("/recruit");
    return;
  }
  router.push("/gym");
};

export default triggerSearch