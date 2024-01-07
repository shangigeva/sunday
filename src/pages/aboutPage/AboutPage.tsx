import React from "react";

const AboutPage = () => {
  return (
    <div style={styles.container}>
      {/* <h1 style={styles.header}>About Our System</h1> */}
      <p style={styles.text}>
        Welcome to Sunday, the leading platform in project and task management.
        In this system, we prioritize quality, flexibility, and personalization,
        designed specifically for our users' needs.
      </p>
      <h2 style={styles.subHeader}>What Does Our System Offer?</h2>
      <ul style={styles.text}>
        <li>
          <span style={styles.div}>Advanced Project Management</span> : Create,
          edit, and track projects in a clear and intuitive interface.
        </li>
        <li>
          <span style={styles.div}>Tasks and Progress Monitoring:</span> Assign
          tasks to teams and set deadlines, ensuring everyone stays on track.
        </li>
        <li>
          <span style={styles.div}> Project Collaboration:</span> Collaborate
          with team members, share updates, and streamline communication.
        </li>
        <li>
          <span style={styles.div}>Customizable Workflows: </span>Tailor the
          system to fit your team's unique processes and requirements.
        </li>
        <li>
          <span style={styles.div}>Reporting and Analytics:</span> Gain insights
          into project progress, team performance, and more with comprehensive
          reporting tools.
        </li>
      </ul>
      <h2 style={styles.subHeader}>Our Vision</h2>
      <p style={styles.text}>
        We strive to empower teams to work more efficiently, communicate
        seamlessly, and achieve their goals. With continuous updates and user
        feedback, we are committed to providing the best experience for all our
        users.
      </p>
      <h2 style={styles.subHeader}>Contact Us</h2>
      <p style={styles.text}>
        For any questions, feedback, or support inquiries, please contact our
        team:
      </p>
      <ul style={styles.text}>
        <li>
          Email: <a href="mailto:shanig7@gmail.com">shanig7@gmail.com</a>
        </li>
        <li>
          Phone: <a href="tel:+972544655700">054-4655700</a>
        </li>
        <li>Location: Ness-Zionna</li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: "32px",
    marginBottom: "20px",
    textAlign: "center",
  },
  subHeader: {
    fontSize: "28px",
    marginTop: "30px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  div: { fontWeight: "bold" },
};

export default AboutPage;
