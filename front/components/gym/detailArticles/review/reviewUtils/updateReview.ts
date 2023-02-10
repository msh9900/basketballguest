const updateReview = (reviewId:any, updateReviewObj:any) => {
  fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rental/review?reviewId=${reviewId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateReviewObj),
    }
  );
}

export default updateReview