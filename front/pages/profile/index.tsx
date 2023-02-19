import withGetServerSideProps from "hocs/withServersideProps";
import classes from "./Profile.module.scss";
import { useRouter } from "next/router";
import ProfileChange from "components/user/profile/ProfileChange";
import PwChange from "components/user/profile/PwChange";

const Profile = () => {
  const router = useRouter();
  return (
    <div className={classes.profileLayout}>
      <img
        className={classes.imgPoster}
        onClick={() => {
          router.push("/");
        }}
        src="/images/logos/poster.png"
      />
      <section>
        <ProfileChange />
      </section>

      <section>
        <PwChange />
      </section>
    </div>
  );
};

export default Profile;
export const getServerSideProps = withGetServerSideProps(
  async (context: any) => {
    return {
      props: {},
    };
  }
);
