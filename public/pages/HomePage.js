import React from 'react';

import IllustrationHome from 'url:../assets/img/ui/illustration-intro.png';

const HomePage = () => {
  return (
    <main className="main">
      <section className="section-cta">
        <div className="section-cta__left">
          <h1 className="heading-primary">
            Bring your team together to build better products.
          </h1>
          <p className="product-description">
            IssueTracker makes it simple for software teams to plan day-to-day
            tasks while keeping the larger team goals in view.
          </p>
          <button className="btn btn--big btn--dark">Start now!</button>
        </div>
        <div className="section-cta__right">
          <img
            src={IllustrationHome}
            alt="Measure performance of the team and assign tasks"
            className="section-cta__hero"
          />
        </div>
      </section>
      <section className="section-advantages">
        <div className="section-advantages__left">
          <h2 className="heading-secondary">
            What's so different about IssueTracker?
          </h2>
          <p className="product-description">
            Issue tracker provides all the functionalities required to create,
            track and approve project completion. All in easy to set up project
            environment and it is completely free!
          </p>
        </div>
        <div className="section-advantages__right">
          <ul className="features">
            <li className="features__item">
              <h3 className="heading-tertiary">Project porftolio</h3>
              <p className="product-description">
                IssueTracker is easy to set up and allows the project manager as
                well as the development team to maintain a project portfolio of
                projects that they are assigned to. No more unnecessary
                notifications about projects that do not concern you.
              </p>
            </li>
            <li className="features__item">
              <h3 className="heading-tertiary">
                Approaching deadlines dashboard
              </h3>
              <p className="product-description">
                Prioritize your work and fix the bugs based on the approaching
                deadlines for projects. Plan ahead, so you can request help
                earlier if necessary.
              </p>
            </li>
            <li className="features__item">
              <h3 className="heading-tertiary">Lorem ipsum dolor</h3>
              <p className="product-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
