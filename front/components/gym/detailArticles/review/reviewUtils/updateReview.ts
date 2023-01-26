const updateReview = (reviewId:any, updateReviewObj:any) => {
  fetch(
    `http://localhost:4000/rental/review?reviewId=${reviewId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateReviewObj),
    }
  );
}

export default updateReview