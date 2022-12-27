import classes from "./Homepage.module.scss";
export default function HomePage() {
  return (
    <>
      <div className={classes.videocontainer}>
        <video
          className={classes.backgroundvideo}
          src="./basketball.mp4"
          autoPlay
          muted
          loop
        />
        <div className={classes.videologocontainer}>
          <div className={classes.videologo}>basketball </div>
          <div className={classes.videologo}>play</div>
          <div className={classes.videologo}>together</div>
        </div>
      </div>
      <div>소개</div>
      <div>게스트모집</div>
      <div>체육관대여</div>
      <div>고객센터</div>
    </>
  );
}
