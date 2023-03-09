import withGetServerSideProps from "hocs/withServersideProps";
import classes from "./Intro.module.scss";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const data = [
  {
    name: "모승환 (FE)",
    image:
      "https://cdn.clien.net/web/api/file/F01/12160492/1ec08f2254cb75.jpg",
    content: "메인 페이지,게스트 페이지,서비스 페이지 (챗봇)  ",
    url: "https://github.com/msh9900",
  },
  {
    name: "천해성 (FE, BE)",
    image: "https://avatars.githubusercontent.com/u/100825999?v=4",
    // content:
    //   "로그인 기능(Redux) 구현 및 로그인 쿠키 로직 구현, 회원가입 구현, 마이페이지 구현 및 각 컴포넌트에서 데이터를 전달하기 위한 API 구현 및 데이터베이스구축",
    content:
      "로그인, 회원가입, 마이페이지, BPT REST API, Database (MongoDB), Server (Amazon EC2)",
    url: "https://github.com/BoGusD",
  },
  {
    name: "윤시준 (FE)",
    image:
      "https://images.pexels.com/photos/6585322/pexels-photo-6585322.jpeg?auto=compress&cs=tinysrgb&w=1600",
    content: "체육관 페이지",
    url: "https://github.com/webcodur",
  },
];

export default function IntroducePage() {
  return (
    <div className={classes.MainContainer}>
      <Grid spacing={5} container>
        {data.map((val, idx) => (
          <Grid
            key={idx}
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                width: 400,
              }}
            >
              <CardActionArea href={val.url}>
                <CardMedia
                  component="img"
                  height="350"
                  image={val.image}
                  alt="본인 이미지"
                />
                <CardContent sx={{ height: "400px" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: 32, textAlign: "center" }}
                  >
                    {val.name}
                  </Typography>
                  <ul>
                    {val.content.split(",").map((val, idx) => (
                      <li key={idx}>{val}</li>
                    ))}
                  </ul>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export const getServerSideProps = withGetServerSideProps(
  async (context: any) => {
    return {
      props: {},
    };
  }
);
