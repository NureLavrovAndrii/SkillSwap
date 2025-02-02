import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="content1-container">
      <div className="contentContainerStyle">
        <h2 >About Us</h2>
        <p >
          <i>
            As students, we have looked for upskilling everywhere. Mostly, we end up paying big amounts to gain
            certifications and learn relevant skills. We thought of SkillSwap to resolve that. Learning new skills and
            gaining more knowledge all while networking with talented people!
          </i>
        </p>
        <p className="descriptionStyle">
          <br />
          At SkillSwap, we believe in the power of learning and sharing knowledge. Our platform connects individuals
          from diverse backgrounds to exchange practical skills and expertise. Whether you're a seasoned professional
          looking to mentor others or a beginner eager to learn, SkillSwap provides a supportive environment for growth
          and collaboration.
          <br />
          <br />
          Our mission is to empower individuals to unlock their full potential through skill sharing. By facilitating
          meaningful interactions and fostering a culture of lifelong learning, we aim to create a community where
          everyone has the opportunity to thrive.
        </p>
      </div>
      <img src={"/assets/images/about us.jpg"} style={{ maxWidth: "50vw", maxHeight: "100vh", background: "transparent" }} />
    </div>
  );
};

export default AboutUs;