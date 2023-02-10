const serviceTitle = "BPT";

type BPT_PAGES = {
  [index: string]: string;
  "/": string;
  "/gym": string;
  "/gym/post": string;
  "/gym/articles": string;
  "/service": string;
  "/auth/lostId": string;
  "/auth/lostPw": string;
  "/findUserId": string;
  "/findUserPw": string;
  "/intro": string;
  "/login": string;
  "/profile": string;
  "/guest": string;
};
const descMap: BPT_PAGES = {
  "/": `${serviceTitle}, Basketball Play Together`,
  "/gym": "체육관 대관/홍보 정보 페이지",
  "/gym/post": "체육관 홍보글 작성 페이지",
  "/gym/articles": "체육관 대관정보 조회 페이지",
  "/service": "서비스 안내 페이지",
  "/auth/lostId": "아이디 찾기 페이지",
  "/auth/lostPw": "비밀번호 찾기 페이지",
  "/findUserId": "아이디 찾기 페이지",
  "/findUserPw": "비밀번호 찾기 페이지",
  "/intro": "소개 페이지",
  "/login": "로그인 페이지",
  "/profile": "프로필 수정 페이지",
  "/guest": "게스트 모집 페이지"
};

const getDescFromPath = (path: string) => {
  return descMap[path] as string;
};

export default getDescFromPath;
