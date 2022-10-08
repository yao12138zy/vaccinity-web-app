import React from "react";
import classNames from "classnames";
import { Grid, Card, Box, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import LoginButton from "../LoginButton";
import Logo from "../Logo";
import Notification from "../Notification";
import MenuBar from "../MenuBar";
import "./styles.css";

class SearchPage extends React.Component {
  render() {

  const year = this.props.year;
  const month = this.props.month;
  const day = this.props.day;
  const location = this.props.location;
  const app = this.props.app;
  const home = this.props.location.home;
  const isAdmin = this.props.location.isAdmin;

  if (location) {
    var info = "";
    var locationTitle = "Vaccines you need for: " + location
    {if (location.includes('Africa')) {
      info="You need to get Yellow Fever shots for African Countries"
    }};
    {if (location.includes('China')) {
      info="You need to get Measles, Hepatitis A shots for China"
    }};
    {if (location.includes('Canada')) {
      info="You need to get Measles, Rabies shots for Canada"
    }};
    {if (location.includes('Namibia')) {
      info="You need to get Measles, Typhoid shots for Namibia"
    }};
    {if (location.includes('United States')) {
      info="No req for United States of America, but be aware of the Coronavirus travel restrivtions!"
    }};
    {if (location.includes('Australia')) {
      info="You need to get Measles, Rabies, Hepatitis A, Hepatitis B, Japanese Encephalitis, Rabies, and Yellow Fever vaccinations for Australia."
    }};
    {if (location.includes('Dubai')) {
      info="You need to get Measles, Hepatitis A, and Typhoid shots for Dubai"
    }}; 
    {if (location.includes('Russia')) {
      info="You need to get Measles and Hepatitis A shots for Russia"
    }};
  }
  else {
    var locationTitle = "Please select a location if you want to see more information."
  }
  

  if (year) {
    var age = (2020 - year);
    var ageinfo = "Vaccines you need for age of: " + age
    if ({age}<3) {
      var agecontent = " Vaccinating your child is one of the most important things you can do to protect their health. Infants and young children are especially vulnerable to vaccine-preventable diseases because their immune systems are less mature, and therefore less able to fight off infection. Between birth and 6 years of age, infants and children are offered free vaccines that protect them against 14 different diseases: *All Aboriginal children are also offered a vaccine that protects against hepatitis A. Some of these vaccines are given as combination vaccines (vaccines that contain more than one vaccine in a single shot), and some are given individually. Combination vaccines are safe and provide the same protection as vaccines given individually, but with fewer shots. Chickenpox (varicella), Diphtheria, Haemophilus influenzae type b (Hib), Hepatitis B, Influenza, Measles, Meningococcal, Mumps, Pertussis (whooping cough), Pneumococcal, Polio, Rotavirus, Rubella, Tetanus.  "
    }
    if ({age}<18) {
      var agecontent = "A number of vaccines are recommended for school-age children and teens. Children with chronic health conditions may need additional vaccines or additional doses of vaccine. Talk to your health care provider about what additional vaccines your child may need. Children should receive all of the recommended vaccines on schedule. These vaccines protect children against diseases that can cause serious illness, long-term disability, or death. There are no benefits to delaying or skipping vaccines for your child, only risks. Human Papillomavirus (HPV) vaccine, Chickenpox (varicella) vaccine (children who have had two doses of the chickenpox vaccine, or who have had chickenpox disease or shingles after one year of age do not need the vaccine), Hepatitis B vaccine (children who have had 3 doses of the hepatitis B vaccine at a younger age do not need the vaccine), Tetanus, Diphtheria, Pertussis (Tdap) Vaccine, Meningococcal Quadrivalent Vaccine."
    }
    else {
      var agecontent = "Adults need vaccines to stay healthy too. Some vaccines are routinely recommended for all adults. these include: Tetanus and Diphtheria (Td) vaccine, Tetanus, Diphtheria, and Pertussis (Tdap) vaccine, Shingles vaccine, Pneumococcal polysaccharide vaccine, Influenza (flu) vaccine. You can get publicly-funded vaccines from your local health unit, most pharmacies, and some doctors’ offices. You can purchase non-publicly funded vaccines at most pharmacies and travel clinics."
    }
  }
  else {
    var ageinfo = "You did not provide any dates. Please select birth dates of interest to see more information."
  }
  

  return (

  <div>
      <span className="LogoContainer">
      <   Logo />
      </span>
      <span className="LoginButtonContainer">
          {" "}
          <LoginButton app={app} />{" "}
      </span>
          <MenuBar home={home} isAdmin={isAdmin}/>
    
    <Box
      className= "info_box"
      display="flex"
      justifyContent="center"
    >
            <div style={{
              maxWidth: 1280,
              width: "100%"}}>
                <Grid container spacing={5} >
                    <Grid item className="search_grid">
                        <Card>
                            <Box pt={3} pr={3} pl={3} pb={2} >
                                <Typography variant="h3" >
                                  General Information
                                </Typography>
                                  <br/>
                                  Routine vaccines are those recommended for everyone. Regardless of your travel destination, 
                                  it is important to ensure your routine vaccines are up-to-date. 
                                  These vaccines provide protection against many diseases that may be uncommon in Canada, 
                                  such as measles and polio, but are still common in other parts of the world.
                                  <br/>
                                  <br/>
                                  When travelling internationally, you may be at risk for a number of diseases that are 
                                  rarely found in Canada but are common in other parts of the world. 
                                  Travel vaccines will provide you with important protection. 
                                  Travel health notices are posted by the Government of Canada for Canadians travelling abroad. 
                                  <br/>
                                  <br/>
                                <Typography variant="h5" >
                                  {locationTitle}
                                </Typography>
                                  {info}
                                  <br/>
                                  <br/>
                                <Typography variant="h5" > 
                                  {ageinfo}
                                </Typography>
                                  {agecontent}
                                  <br/>
                                  <br/>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </Box>
    </div>
  );
}
}

export default SearchPage;