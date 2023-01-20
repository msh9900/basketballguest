[
  "{{repeat(5, 7)}}",
  {
    gymId: "{{objectId()}}",
    title: '{{lorem([1], "words")}}',
    content: '{{lorem([4], "sentences")}}',
    contact: "010-0000-0000",
    address: [
      { category: "postCode", val: '{{lorem([3], "words")}}' },
      { category: "roadAddress", val: '{{lorem([3], "words")}}' },
      { category: "jibunAddress", val: '{{lorem([3], "words")}}' },
      { category: "detailAddress", val: '{{lorem([3], "words")}}' },
      { category: "extraAddress", val: '{{lorem([3], "words")}}' },
    ],
    price: "100000",
    openingHours: ["09:00", "20:00"],
    openingPeriod: ["2023-01-01", "2023-12-31"],
    openingDays: [
      { name: "일", open: false },
      { name: "월", open: false },
      { name: "화", open: false },
      { name: "수", open: false },
      { name: "목", open: false },
      { name: "금", open: false },
      { name: "토", open: false },
    ],
    userInfo: {
      userId: "{{objectId()}}",
      userName: "{{firstName()}} {{surname()}}",
      email: "{{email()}}",
    },
  },
];
