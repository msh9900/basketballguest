// GLOBAL STATE

import { search } from "redux/modules/search";
const triggerSearch = (
  searchValue: string,
  selectValue: string,
  router: any,
  dispatch: any
) => {
  // 1. CHANGE STATE
  const stateObj = {
    searchValue,
    globalSearchNeeded: true,
  };
  dispatch(search(stateObj));

  // 2. MOVE TO TARGET PAGE
  if (selectValue == "guest") {
    router.push("/guest");
    return;
  }
  router.push("/gym");
};

export default triggerSearch;
