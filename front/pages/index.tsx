import classes from "./index.module.scss";
import Grid from "@mui/material/Grid";
import Button2 from "../components/common/Button2";
import withGetServerSideProps from 'hocs/withServersideProps';

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
                좋은 환경에서 좋은 사람들과 경기를 즐겨보세요 <br />
                BPT가 도와드리겠습니다.
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
            경기 참여나 게스트 모집을 원하십니까? <br />
            BPT에서 경기 정보를 확인해 보세요!
            <br />
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
            체육관 홍보나 대관이 필요하십니까? <br />
            BPT에서 체육관 정보를 찾아보세요!
            <br />
          </div>
          <Button2 src="/gym" />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withGetServerSideProps(async (context:any) => {
	return {
		props: {},
	};
});
