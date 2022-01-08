import { SyntheticEvent, useEffect, useState } from 'react'
import { getUserBioData } from '../mock-data'

interface AboutProps {
  userId: string
}

const About = ({ userId }: AboutProps) => {
  const [image, setImage] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [phone, setPhone] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [resumedownload, setResumeDownload] = useState<string | null>(null)
  useEffect(() => {
    const handleStatusChange = async () => {
      const bioData = await getUserBioData(userId)
      if (bioData) {
        const receivedImage = bioData.user.image || null
        const receivedBio = bioData.user.bio || null
        const receivedCity = bioData.user.address?.city || null
        const receivedName = bioData.user.name || null
        const receivedCountry = bioData.user.address?.country || null
        const receivedPhone = bioData.user.phone || null
        const receivedEmail = bioData.user.email || null
        const resumedownloadLink = bioData.user.resumedownload || null
        console.log(receivedImage)
        setImage(receivedImage)
        setBio(receivedBio)
        setCity(receivedCity)
        setName(receivedName)
        setCountry(receivedCountry)
        setPhone(receivedPhone)
        setEmail(receivedEmail)
        setResumeDownload(resumedownloadLink)
        return Promise.resolve()
      }
      return Promise.resolve()
    }
    handleStatusChange()
  }, [userId])
  /* eslint-disable no-param-reassign */
  const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = ''
    event.currentTarget.className = 'error'
  }

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          {image === null ? null : (
            <img
              className="profile-pic"
              src={image}
              onError={event => imageOnErrorHandler(event)}
              alt="Jussi Lemmetyinen Profile Pic"
            />
          )}
        </div>
        <div className="nine columns main-col">
          <h2>About Me</h2>

          <p>{bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                <br />
                <span>
                  {city}, {country}
                </span>
                <br />
                {phone && <span>{phone}</span>}
                <br />
                <span>{email}</span>
              </p>
            </div>
            {resumedownload ? (
              <div className="columns download">
                <p>
                  <a href={resumedownload} className="button">
                    <i className="fa fa-download" />
                    Download Resume
                  </a>
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
