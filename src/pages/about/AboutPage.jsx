import './AboutPage.css'

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="hero-animation-wrapper">
            <h1>About <span className="highlight">finio</span></h1>
            <p className="lead">Empowering individuals to master their financial journey through intelligent design and actionable data.</p>
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="content-grid">
            <div className="text-block">
              <h2>The Theme & Purpose</h2>
              <p>
                finio is a premium personal finance management platform designed for individuals who seek clarity in their economic lives. 
                Our purpose is to bridge the gap between complex banking data and everyday decision-making. 
                Whether you're tracking daily expenses, managing multiple bank accounts, or planning long-term investments, 
                finio provides a unified dashboard to visualize your progress.
              </p>
            </div>
            <div className="text-block">
              <h2>Problem & Solution</h2>
              <p>
                Traditional banking apps often fail to give a holistic view of one's finances across different platforms. 
                finio solves this by centralizing your financial data, offering real-time insights into spending patterns, 
                and providing automated budget tracking. We turn "just numbers" into a narrative of your financial health.
              </p>
            </div>
          </div>

          <div className="tech-stack-section">
            <h2>Technology Stack</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <strong>React 18</strong>
                <span>UI Core</span>
              </div>
              <div className="tech-item">
                <strong>Vite</strong>
                <span>Build Tool</span>
              </div>
              <div className="tech-item">
                <strong>Recharts</strong>
                <span>Data Viz</span>
              </div>
              <div className="tech-item">
                <strong>Vanilla CSS</strong>
                <span>Styling</span>
              </div>
            </div>
          </div>

          <div className="team-section">
            <h2>The Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">M1</div>
                <h3>Member One</h3>
                <p className="role">Frontend Lead & Dashboard</p>
                <p className="description">Focused on the core dashboard layout and real-time chart integrations.</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">M2</div>
                <h3>Member Two</h3>
                <p className="role">Auth & Logic</p>
                <p className="description">Implemented the secure authentication flow and context management.</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">M3</div>
                <h3>Member Three</h3>
                <p className="role">UI/UX & Branding</p>
                <p className="description">Designed the dark-themed aesthetic and interactive components.</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">M4</div>
                <h3>Member Four</h3>
                <p className="role">Documentation & Testing</p>
                <p className="description">Managed project documentation and ensured component-level functional integrity.</p>
              </div>
            </div>
          </div>

          <div className="phase-link-section">
            <p>This project is an evolution of our original concept.</p>
            <a href="#" className="phase-link">View Phase I Project Overview</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
