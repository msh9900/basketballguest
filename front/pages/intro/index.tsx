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
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/af7daab6-c8ed-4dc7-a975-53e7087e4b18/KakaoTalk_20221014_153646628.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230305T155106Z&X-Amz-Expires=86400&X-Amz-Signature=e4605593eaa7b58e07c5e47b6bc30b5b8fdeba74395512029cb7b0258b4388de&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22KakaoTalk_20221014_153646628.jpg%22&x-id=GetObject",
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
