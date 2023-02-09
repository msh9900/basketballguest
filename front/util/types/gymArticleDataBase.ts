const gymArticleDataBase = {
  createdAt: "",
  articleId: "",
  articleUserId: "",
  userId: "",
  userName: "",
  title: "",
  content: "",
  contact: "",
  gymImg:[],
  areaTag:"",
  price: "100000",
  openingHours: ["09:00", "20:00"],
  openingPeriod: ["2023-01-01", "2023-12-31"],
  openingDays: [
    {
      name: "일",
      open: false,
    },
    {
      name: "월",
      open: false,
    },
    {
      name: "화",
      open: false,
    },
    {
      name: "수",
      open: false,
    },
    {
      name: "목",
      open: false,
    },
    {
      name: "금",
      open: false,
    },
    {
      name: "토",
      open: false,
    },
  ],
  address: [
    {
      category: "postCode",
      val: "",
    },
    {
      category: "roadAddress",
      val: "",
    },
    {
      category: "jibunAddress",
      val: "",
    },
    {
      category: "detailAddress",
      val: "",
    },
    {
      category: "extraAddress",
      val: "",
    },
  ],
};

export default gymArticleDataBase;
