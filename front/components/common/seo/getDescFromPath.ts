const serviceTitle = "BPT";
type titleMapType = {
  [index: string]: string;
  "/": string;
  "/gym": string;
  "/gym/post": string;
  "/gym/articles": string;
  "/service": string;
};
const descMap: titleMapType = {
  "/": `${serviceTitle}, Basketball Play Together`,
  "/gym": "체육관 대관/홍보 정보를 확인할 수 있습니다.",
  "/gym/post": "체육관 홍보글 작성",
  "/gym/articles": "체육관 대관정보 조회",
  "/service": "서비스 안내",
};

const getDescFromPath = (path: string) => {
  return descMap[path] as string;
};

export default getDescFromPath;
