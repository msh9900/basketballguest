import classes from "./HomePage.module.scss";
import Grid from "@mui/material/Grid";
import Button2 from "../components/Button2";
export default function HomePage() {
  return (
    <>
      {/* 메인홈페이지 비디오 타이틀 부분 */}
      <div className={classes.videocontainer}>
        <video
          className={classes.backgroundvideo}
          src="./basketball.mp4"
          autoPlay
          muted
          loop
        />
        <div className={classes.videologocontainer}>
          <div className={classes.videologo}>Basketball </div>
          <div className={classes.videologo}>Play</div>
          <div className={classes.videologo}>Together</div>
          <div className={classes.videotext}>함께 농구를 즐기다.</div>
        </div>
      </div>
      {/* BPT 이야기 부분*/}
      <div className={classes.introcontainer}>
        <Grid container>
          <Grid item xs={12} md={6} className={classes.video}>
            <video src="./basketball2.mp4" autoPlay muted loop>
              비디오
            </video>
          </Grid>
          <Grid item xs={12} md={6} className={classes.content}>
            <div>
              <div className={classes.title}>BPT 이야기</div>
              <div className={classes.text}>
                BPT는 농구를 좋은 환경 좋은사람들과 할수 있게 <br />
                도움이 되도록 노력하겠습니다.
              </div>
              <Button2 src="/intro" />
            </div>
          </Grid>
        </Grid>
      </div>
      {/* 게스트모집 부분*/}
      <div
        className={classes.guestcontainer}
        style={{ backgroundImage: "url(/basketball1.jpg)" }}
      >
        <div className={classes.title}>
          <div className={classes.text}>
            농구를 같이할 게스트를 모집 혹은 <br />
            참여를 원하십니까?
          </div>
          <Button2 src="/guest" />
        </div>
      </div>
      {/* 체육관 대여 부분*/}
      <div
        className={classes.gymcontainer}
        style={{ backgroundImage: "url(/basketball2.jpg)" }}
      >
        <div className={classes.title}>
          <div className={classes.text}>
            농구를 할 체육관이 <br />
            대관이 필요합니까?
          </div>
          <Button2 src="/gym" />
        </div>
      </div>
    </>
  );
}
