type titleMapType = {
  [index: string]: string;
  "/": string;
  "/gym": string;
  "/gym/post": string;
  "/gym/articles": string;
  "/service": string;
};
const titleMap: titleMapType = {
  "/": "BPT 홈",
  "/gym": "체육관 대관/홍보",
  "/gym/post": "체육관 홍보글 작성",
  "/gym/articles": "체육관 대관정보 조회",
  "/service": "서비스 안내",
};

const getTitleFromPath = (path: string) => {
  return titleMap[path] as string;;
};

export default getTitleFromPath;
