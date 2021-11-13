import { SyntheticEvent } from 'react'
import { UserFields } from '../common'

interface AboutProps {
  user: UserFields
}
const About = ({ user }: AboutProps) => {
  /* eslint-disable no-param-reassign */
  const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = ''
    event.currentTarget.className = 'error'
  }

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          {user.image === '' ? null : (
            <img
              className="profile-pic"
              src={user.image}
              onError={event => imageOnErrorHandler(event)}
              alt="Jussi Lemmetyinen Profile Pic"
            />
          )}
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
