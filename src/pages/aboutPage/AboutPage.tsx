import React from "react";

const AboutPage = () => {
  return (
    <div
      style={styles.container}
      className="bg-[url('/assets/images/blob-pink.png')] bg-no-repeat bg-cover p-7 m-auto rounded-xl"
    >
      <p className="text-base my-5 leading-6">
        Welcome to Sunday, the leading platform in project and task management.
        Within our innovative system, we prioritize quality, flexibility, and
        personalization, meticulously crafted to cater to the diverse needs of
        our valued users.
      </p>
      <h2 className="mt-8 text-3xl">What Does Our System Offer?</h2>
      <ul className="text-base my-5 leading-6">
        <li>
          <span className="font-bold">Advanced Project Management</span> :
          Seamlessly create, edit, and monitor projects through a user-friendly
          interface, ensuring clarity and efficiency.
        </li>
        <li>
          <span className="font-bold">Tasks and Progress Monitoring:</span>
          Dynamically assign tasks to teams, establish deadlines, and
          effortlessly track progress to keep projects on course.
        </li>
        <li>
          <span className="font-bold"> Project Collaboration:</span> Foster
          seamless collaboration among team members, facilitating real-time
          updates and streamlined communication channels.
        </li>
        <li>
          <span className="font-bold">Customizable Workflows: </span>Tailor the
          system to align with the unique processes and specifications of your
          team, enhancing productivity and effectiveness.
        </li>
        <li>
          <span className="font-bold">Reporting and Analytics:</span> Harness
          the power of comprehensive reporting tools to gain valuable insights
          into project progression, team performance, and more.
        </li>
      </ul>
      <h2 className="mt-8 text-3xl">Our Vision</h2>
      <p className="text-base my-5 leading-6">
        our vision is to empower teams to operate with heightened efficiency,
        fostering seamless communication and facilitating the achievement of
        their objectives. Through continual updates and attentive user feedback,
        we are steadfast in our commitment to delivering an unparalleled user
        experience.
      </p>
      <h2 className="mt-8 text-3xl">Contact Us</h2>
      <p className="text-base my-5 leading-6">
        Should you have any inquiries, feedback, or require support, please
        don't hesitate to reach out to our dedicated team:
      </p>
      <ul className="text-base my-5 leading-6">
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
    maxWidth: "800px",
  },
};
export default AboutPage;
