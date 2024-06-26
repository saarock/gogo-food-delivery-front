import React from 'react';
import './aboutPage.css';


const AboutPage: React.FC = () => {
  return (
    <div className="gogo-about-page">
      <section className="gogo-about-section gogo-about-introduction">
        <div className="gogo-about-content">
          <h2>About Our Company</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla felis odio, 
            fermentum eget enim sit amet, consequat faucibus lacus. Cras quis tellus eros. 
            Nulla facilisi. Maecenas gravida tellus nec libero pulvinar, et convallis risus 
            commodo. Vestibulum non metus urna. Donec aliquam vel lectus vel condimentum. 
            Vivamus ut odio in orci ullamcorper vehicula. Sed vestibulum libero eu efficitur 
            pellentesque.
          </p>
          <p>
            Nullam scelerisque tortor non turpis condimentum, sit amet consectetur lorem 
            ullamcorper. Sed luctus metus ac lectus iaculis, in volutpat leo malesuada. 
            Duis vulputate, velit sed egestas ultricies, neque erat consequat odio, non 
            lacinia libero libero eu elit.
          </p>
        </div>
        <div className="gogo-about-image">
          <img src="https://via.placeholder.com/400" alt="About Us" />
        </div>
      </section>

      <section className="gogo-about-section gogo-about-team">
        <h2>Our Team</h2>
        <div className="gogo-team-members">
          {/* <TeamMember name="John Doe" position="CEO" imageSrc="https://via.placeholder.com/150" />
          <TeamMember name="Jane Smith" position="COO" imageSrc="https://via.placeholder.com/150" />
          <TeamMember name="Michael Brown" position="CTO" imageSrc="https://via.placeholder.com/150" /> */}
          {/* Add more TeamMember components as needed */}
        </div>
      </section>

      <section className="gogo-about-section gogo-about-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide the best products and services to our customers. 
          We aim to innovate and create value, ensuring customer satisfaction at every step.
        </p>
      </section>

      <section className="gogo-about-section gogo-about-achievements">
        <h2>Our Achievements</h2>
        <ul>
          <li>Winner of Best Customer Service Award</li>
          <li>Top 10 Fastest Growing Companies in the Region</li>
          <li>Featured in Industry Leading Publications</li>
          {/* Add more achievements */}
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
