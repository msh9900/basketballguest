interface replyType {
  id: string,
  userName: string,
  date: string,
  contents: string,
  isCreater:boolean
}

const commentData = [
  {
    id: "111",
    userName: "홍길동",
    date: "2023-01-01",
    contents: "연락 안되네요 번호 맞나요?",
    isCreater:false,
    replys:[
      {
        to: '홍길동',
        id: "aaa",
        userName: "임꺽정",
        date: "2023-01-01",
        contents: "저도 안되네요",
        isCreater:false
      },
      {
        to: '홍길동',
        id: "bbb",
        userName: "장길산",
        date: "2023-01-01",
        contents: "오전엔 안받더군요",
        isCreater:false
      },
      {
        to: '홍길동',
        id: "ccc",
        userName: "임대인",
        date: "2023-01-01",
        contents: "작성자입니다, 오전에는 전화를 못 받고 있어서 오후에 좀 부탁드립니다.",
        isCreater:true
      },
    ],
  },
  {
    id: "222",
    userName: "김정호",
    date: "2023-01-01",
    contents: "가는 길이 좀 어지럽네요",
    isCreater:false,
    replys:[
      {
        to: '김정호',
        id: "ccc",
        userName: "임대인",
        date: "2023-01-01",
        contents: "그건 님이 길치라서 그렇습니다",
        isCreater:true
      },
    ],
  },
  {
    id: "333",
    userName: "신돈",
    date: "2023-01-01",
    contents: "괜찮아보이는데 리뷰가 없네요",
    isCreater:false,
    replys:[],
  },
  {
    id: "444",
    userName: "강백호",
    date: "2023-01-01",
    contents: "끝말잇기 할 사람? 사과",
    isCreater:false,
    replys:[
      {
        to: '강백호',
        id: "ddd",
        userName: "정대만",
        date: "2023-01-01",
        contents: "과일",
        isCreater:false
      },
      {
        to: '정대만',
        id: "fff",
        userName: "채치수",
        date: "2023-01-01",
        contents: "일본",
        isCreater:false
      },
      {
        to: '채치수',
        id: "ddd",
        userName: "송태섭",
        date: "2023-01-01",
        contents: "본가",
        isCreater:false
      },
    ],
  },
];

export default commentData;
