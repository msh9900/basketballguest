import withGetServerSideProps from "hocs/withServersideProps";
import classes from "./Profile.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import ProfileChange from "components/user/profile/ProfileChange";
import PwChange from "components/user/profile/PwChange";

const Profile = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("Profile");
  const onClickTabMenu = (ele: string) => {
    console.log(ele);
    setCurrentTab(ele);
  };

  return (
    <div className={classes.profileLayout}>
      {/* BPT LOGO */}
      <img
        className={classes.imgPoster}
        onClick={() => {
          router.push("/");
        }}
        src="/images/logos/poster.png"
      />

      {/* TAB MENUS */}
      <div className={classes.menuBar}>
        <div className={classes.tabCon}>
          <nav className={classes.tabmenu}>
            <ul className={classes.flex}>
              <li
                onChange={() => {
                  onClickTabMenu("Profile");
                }}
              >
                <input
                  type="radio"
                  defaultChecked
                  name="tabmenu"
                  id="tabmenu01"
                />
                <label htmlFor="tabmenu01">Profile</label>
              </li>
              <li
                onChange={() => {
                  onClickTabMenu("PW");
                }}
              >
                <input type="radio" name="tabmenu" id="tabmenu02" />
                <label htmlFor="tabmenu02">PW</label>
              </li>
            </ul>

            {/* CARDS */}
            {currentTab == "Profile" && (
              <div className={classes.conbox}>
                <section>
                  <ProfileChange />
                </section>
              </div>
            )}
            {currentTab == "PW" && (
              <div className={classes.conbox}>
                <section>
                  <PwChange />
                </section>
              </div>
            )}
          </nav>
        </div>
      </div>
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
