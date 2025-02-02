import React, { useState, useEffect }from 'react'
import './LandingPage.css'

const LandingPage = () => {

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
        setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    const imageBelowStyle = {
        position: "absolute",
        right: `${scrollPosition}px`,
        width: "400px",
        justifyContent: "center",
      };
    
      const imageStyle = {
        position: "absolute",
        left: `${scrollPosition}px`,
        width: "400px",
        justifyContent: "center",
      };
    
    
  return (
    <div className='container'>
      <div className='container'>
        <div>
          <img src={"/assets/images/1.png"} alt="Above Image" style={imageStyle} />
          <div className='title-container'>
            <h1>SKILL SWAP</h1>
          </div>
          <img src={"/assets/images/2.png"} alt="Below Image" style={imageBelowStyle} />
        </div>
      </div>
      <h2 className='content-title'>WHY SKILL SWAP?</h2>
      <div id="why-skill-swap" className='text-container'>
        <div className='description'>
          At Skill Swap, we believe in the power of mutual learning and collaboration. Here's why Skill Swap is the
          ultimate platform for skill acquisition and knowledge exchange:
          <br />
          <br />
          <br />
          <h4 >➊ Learn From Experts:</h4> Gain insights and practical knowledge directly
          from experienced mentors who excel in their respective fields. Whether it's mastering a new programming
          language, honing your culinary skills, or delving into the world of digital marketing, our mentors are here to
          guide you every step of the way.
          <br />
          <br />
          <h4 >➋ Share Your Expertise:</h4> Have a skill or passion you're eager to share?
          Skill Swap provides a platform for you to become a mentor yourself. Share your expertise with others, foster a
          sense of community, and contribute to the growth of aspiring learners.
          <br />
          <br />
          <h4 >➌ Collaborative Environment:</h4> Our community thrives on collaboration.
          Connect with like-minded individuals, participate in group projects, and engage in discussions that fuel
          creativity and innovation. Skill Swap isn't just about individual growth—it's about collective advancement.
          <br />
          <br />
          <h4 >➍ Diverse Learning Opportunities:</h4> With Skill Swap, the possibilities are
          endless and <b>free of cost</b>. Explore a wide range of topics and disciplines, from traditional crafts to
          cutting-edge technologies. Our diverse library of skills ensures there's something for everyone, regardless of
          your interests or background.
          <br />
          <br />
          <h4 >➎ Continuous Growth:</h4> Learning is a lifelong journey, and Skill Swap is
          here to support you every step of the way. Whether you're a novice or a seasoned professional, our platform
          empowers you to continuously expand your knowledge, challenge yourself, and embrace new opportunities.
        </div>
      </div>
    </div>
  )
}

export default LandingPage