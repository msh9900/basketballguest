const getData = async (
  bundleIdx: number,
  bundleSize: number,
  setData: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const pid = bundleIdx * bundleSize;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/board/article?pid=${pid}`
  );
  const res = await response.json();
  setData((prev) => [...prev, ...res[0]]);
  return res[1];
};

export default getData;
