import { UserFields } from '../common'

interface AboutProps {
  user: UserFields
}
const About = ({ user }: AboutProps) => {
  const profilepic = `images/${user.image}`
  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img className="profile-pic" src={profilepic} alt="Jussi Lemmetyinen Profile Pic" />
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>

          <p>{user.bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{user.name}</span>
                <br />
                <span>
                  {user.address.city}, {user.address.country}
                </span>
                <br />
                {user.phone && <span>{user.phone}</span>}
                <br />
                <span>{user.email}</span>
              </p>
            </div>
            <div className="columns download">
              <p>
                <a href={user.resumedownload} className="button">
                  <i className="fa fa-download" />
                  Download Resume
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
