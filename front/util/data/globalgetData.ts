const globalGetData = async (
  bundleIdx: number,
  bundleSize: number,
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  globalSearchValue: string
) => {
  if (!globalSearchValue) {
    globalSearchValue = "";
  }
  const pid = bundleIdx * bundleSize;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/board/search?pid=${pid}&keyword=${globalSearchValue}`
  );
  const res = await response.json();
  setData((prev) => [...prev, ...res[0]]);
  return res[1];

  // const stateObj = {
  //   searchValue: "",
  //   globalSearchNeeded: false,
  // };
  // dispatch(search(stateObj));
};
export default globalGetData;
