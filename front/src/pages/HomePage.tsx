import classes from "./HomePage.module.scss";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { url } from "inspector";
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
          <div className={classes.videologo}>Basketball </div>
          <div className={classes.videologo}>Play</div>
          <div className={classes.videologo}>Together</div>
          <div className={classes.videotext}>함께 농구를 즐기다.</div>
        </div>
      </div>
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
              <Link to="/intro" className={classes.link}>
                자세히 보기
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
      <div
        className={classes.guestcontainer}
        style={{ backgroundImage: "url(/basketball1.jpg)" }}
      >
        <div className={classes.title}>
          <div className={classes.text}>
            농구를 같이할 게스트를 모집 혹은 <br />
            참여를 원하십니까?
          </div>
          <Link to="/guest" className={classes.link}>
            자세히 보기
          </Link>
        </div>
      </div>
      <div
        className={classes.gymcontainer}
        style={{ backgroundImage: "url(/basketball2.jpg)" }}
      >
        <div className={classes.title}>
          <div className={classes.text}>
            농구를 할 체육관이 <br />
            대관이 필요합니까?
          </div>
          <Link to="/gym" className={classes.link}>
            자세히 보기
          </Link>
        </div>
      </div>
      <div>고객센터</div>
    </>
  );
}
