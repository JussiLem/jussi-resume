import { SyntheticEvent, useEffect, useState } from 'react'
import { isLeft, isRight } from 'fp-ts/es6/Either'
import { getUserBioData } from '../mock-data'
import { parseUser } from '../common'

export const handleAboutData = async (userId: string) => {
  try {
    const bioData = await getUserBioData(userId)
    return parseUser(JSON.parse(bioData))
  } catch (e) {
    throw Error(e)
  }
}
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
      const bioData = await handleAboutData(userId)
      if (isRight(bioData)) {
        const receivedImage = bioData.right.image || null
        const receivedBio = bioData.right.bio || null
        const receivedCity = bioData.right.address?.city || null
        const receivedName = bioData.right.name || null
        const receivedCountry = bioData.right.address?.country || null
        const receivedPhone = bioData.right.phone || null
        const receivedEmail = bioData.right.email || null
        const resumedownloadLink = bioData.right.resumedownload || null
        setImage(receivedImage)
        setBio(receivedBio)
        setCity(receivedCity)
        setName(receivedName)
        setCountry(receivedCountry)
        setPhone(receivedPhone)
        setEmail(receivedEmail)
        setResumeDownload(resumedownloadLink)
      }
      if (isLeft(bioData)) {
        bioData.left.map(errors => errors.message)
      }
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
