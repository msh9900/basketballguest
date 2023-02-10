type BPT_PAGES = {
  [index: string]: string;
  "/": string;
  "/gym": string;
  "/gym/post": string;
  "/gym/[articles]": string;
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
const titleMap: BPT_PAGES = {
  "/": "BPT 홈",
  "/gym": "체육관 대관/홍보",
  "/gym/post": "체육관 홍보글 작성",
  "/gym/[articles]": "체육관 대관정보 조회",
  "/service": "서비스",
  "/auth/lostId": "아이디 찾기",
  "/auth/lostPw": "비밀번호 찾기",
  "/findUserId": "아이디 찾기",
  "/findUserPw": "비밀번호 찾기",
  "/intro": "소개",
  "/login": "로그인",
  "/profile": "프로필 수정",
  "/guest": "게스트 모집"
};

const getTitleFromPath = (path: string) => {
  return titleMap[path] as string;
};

export default getTitleFromPath;
