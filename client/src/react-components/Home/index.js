import React from "react";
import LoginButton from "../LoginButton";
import Logo from "../Logo";
import Notification from "../Notification";
import MenuBar from "../MenuBar";
import VaccineCard from "../VaccinesGallary/";
import TabsSection from "../TabsSection";
//import Wave from '../Wave';
import TopSection from "../TopSection";
//import SlideShow from "../SlideShow";

import ArticleSection from "../ArticleSection";
//<Wave upperColor="#3f51b5" lowerColor="white"/>

import { getArticles } from "../../actions/article";

import "./style.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getAdminInfo } from "../../actions/dashboard";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // fetch list of all articles in database from actions/article.js
    //
    // getArticles(this);
    // const articles = getArticles(this);
    this.state = {
      article: [],
    };
  }

  componentWillMount() {
    getArticles(this);
  }

  render() {
    // console.log(this.state.article);

    const {
      app,
      year,
      month,
      day,
      location,
      handleChange,
      isAdmin,
    } = this.props;

    return (
      <div>
        <div>
          <span id="LogoContainer">
            <Logo />
          </span>
          <span id="LoginButtonContainer">
            <LoginButton app={app} />
          </span>
          <span id="NotificationContainer">
            <Notification number={0} />
          </span>

          <MenuBar
            articles={this.state.article}
            home={this}
            isAdmin={isAdmin}
          />
        </div>
        <div className="home_paper">
          <TopSection />
          {/* <SlideShow /> */}

          <TabsSection
            year={year}
            month={month}
            day={day}
            location={location}
            handleChange={handleChange}
            home={this}
            isAdmin={isAdmin}
          />
          <ArticleSection home={this} isAdmin={isAdmin} />

          <div id="VaccineContainer">
            <VaccineCard />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
