import { useState } from 'react'
import './ContactPage.css'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }
    // Dummy success
    setStatus('success')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get in <span className="highlight">Touch</span></h1>
          <p className="lead">Have questions or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container">
              <h2>Send a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
                
                {status === 'success' && <p className="status-msg success">Message sent successfully!</p>}
                {status === 'error' && <p className="status-msg error">Please fill in all fields.</p>}
              </form>
            </div>

            <div className="contact-info">
              <div className="info-block">
                <h3>Location</h3>
                <p>College of Engineering and Technology</p>
                <p>Department of Computer Science & Engineering</p>
                <p>University Campus, City Name</p>
              </div>

              <div className="info-block">
                <h3>Phase I Project</h3>
                <p>Explore the conceptual beginnings of our dashboard.</p>
                <a href="#" className="info-link">View Phase I Repository</a>
              </div>

              <div className="info-block">
                <h3>Connect with the Team</h3>
                <ul className="social-links">
                  <li>
                    <strong>Member One</strong>
                    <div className="links">
                      <a href="https://github.com/placeholder1">GitHub</a>
                      <span>•</span>
                      <a href="https://linkedin.com/in/placeholder1">LinkedIn</a>
                    </div>
                  </li>
                  <li>
                    <strong>Member Two</strong>
                    <div className="links">
                      <a href="https://github.com/placeholder2">GitHub</a>
                      <span>•</span>
                      <a href="https://linkedin.com/in/placeholder2">LinkedIn</a>
                    </div>
                  </li>
                  <li>
                    <strong>Member Three</strong>
                    <div className="links">
                      <a href="https://github.com/placeholder3">GitHub</a>
                      <span>•</span>
                      <a href="https://linkedin.com/in/placeholder3">LinkedIn</a>
                    </div>
                  </li>
                  <li>
                    <strong>Member Four</strong>
                    <div className="links">
                      <a href="https://github.com/placeholder4">GitHub</a>
                      <span>•</span>
                      <a href="https://linkedin.com/in/placeholder4">LinkedIn</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
