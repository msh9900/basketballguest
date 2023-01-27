const postReview = (reviewObj:any) => {
  fetch("http://localhost:4000/rental/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewObj),
  });
}
export default postReview
