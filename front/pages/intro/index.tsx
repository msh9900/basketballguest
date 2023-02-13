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
    name: "모승환",
    image: "/basketball1.jpg",
    content: "자기소개 내용",
    url: "https://github.com/msh9900",
  },
  {
    name: "모승환",
    image: "/basketball1.jpg",
    content: "자기소개 내용",
    url: "https://github.com/BoGusD",
  },
  {
    name: "모승환",
    image: "/basketball1.jpg",
    content: "자기소개 내용",
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
                  height="300"
                  image={val.image}
                  alt="본인 이미지"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: 32, textAlign: "center" }}
                  >
                    {val.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 24, textAlign: "center" }}
                  >
                    {val.content}
                  </Typography>
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
