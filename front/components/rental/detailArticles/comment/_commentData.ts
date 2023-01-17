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
    contents: "연락이 안되네요 연락처 맞습니까?",
    isCreater:false,
    replys:[
      {
        id: "aaa",
        userName: "전봉준",
        date: "2023-01-01",
        contents: "저도 안되네요",
        isCreater:false
      },
      {
        id: "bbb",
        userName: "김대건",
        date: "2023-01-01",
        contents: "오전에는 안받더군요",
        isCreater:false
      },
      {
        id: "ccc",
        userName: "김옥균",
        date: "2023-01-01",
        contents: "임대인입니다. 오전에는 전화를 못 받고 있습니다. 죄송합니다",
        isCreater:true
      },
    ],
  },
  {
    id: "222",
    userName: "임꺽정",
    date: "2023-01-01",
    contents: "가는 길이 좀 험하구만",
    isCreater:false,
    replys:[],
  },
  {
    id: "333",
    userName: "장길산",
    date: "2023-01-01",
    contents: "괜찮아보이는데 리뷰가 없네요",
    isCreater:false,
    replys:[],
  },
  {
    id: "444",
    userName: "박문수",
    date: "2023-01-01",
    contents: "끝말잇기 할 사람? 사과",
    isCreater:false,
    replys:[
      {
        id: "ddd",
        userName: "안창호",
        date: "2023-01-01",
        contents: "과일",
        isCreater:false
      },
      {
        id: "fff",
        userName: "이순신",
        date: "2023-01-01",
        contents: "일본",
        isCreater:false
      },
    ],
  },
  {
    id: "555",
    userName: "한석봉",
    date: "2023-01-01",
    contents: "hello world",
    isCreater:false,
    replys:[],
  },
  {
    id: "666",
    userName: "김옥균",
    date: "2023-01-01",
    contents: "임대인입니다. 오전에는 일정이 있어서 오후에 연락 주시면 감사하겠습니다",
    isCreater:true,
    replys:[],
  },
  {
    id: "777",
    userName: "정약용",
    date: "2023-01-01",
    contents: "hello world",
    isCreater:false,
    replys:[],
  },
];

export default commentData;
