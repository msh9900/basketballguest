  const deleteReview = async (reviewId: string) => {
    await fetch(
      `http://localhost:4000/rental/review?reviewId=${reviewId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  export default deleteReview