import { SyntheticEvent, useEffect, useState } from 'react'
import { isLeft, isRight } from 'fp-ts/es6/Either'
import { ValidationError } from 'io-ts/es6'
import { getUserBioData } from '../mock-data'
import { parseUserBioData, UserBioData } from '../common'

export const handleAboutData = async (userId: string) => {
  try {
    const raw = await getUserBioData(userId)
    const parsed = JSON.parse(raw)
    return parseUserBioData(parsed)
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw Error(`Failed to parse user: ${e.message}`)
    }
    throw Error('Unknown error')
  }
}
interface AboutProps {
  userId: string
  email: string
}

const About = ({ userId, email }: AboutProps) => {
  const [image, setImage] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [phone, setPhone] = useState<string | null>(null)
  const [resumedownload, setResumeDownload] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>()
  const [errors, setErrors] = useState<string | null>()

  const setBioData = (user: UserBioData) => {
    const receivedImage = user.image || null
    const receivedBio = user.bio || null
    const receivedCity = user.address?.city || null
    const receivedName = user.name || null
    const receivedCountry = user.address?.country || null
    const receivedPhone = user.phone || null
    const resumedownloadLink = user.resumedownload || null
    setImage(receivedImage)
    setBio(receivedBio)
    setCity(receivedCity)
    setName(receivedName)
    setCountry(receivedCountry)
    setPhone(receivedPhone)
    setResumeDownload(resumedownloadLink)
  }

  useEffect(() => {
    const handleStatusChange = async () => {
      try {
        const bioData = await handleAboutData(userId)
        if (isRight(bioData)) {
          setBioData(bioData.right)
        }
        if (isLeft(bioData)) {
          setValidationErrors(bioData.left)
        }
      } catch (err: unknown) {
        setErrors(`not working: ${err}`)
      }
    }
    handleStatusChange()
  }, [userId])
  /* eslint-disable no-param-reassign */
  const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = ''
    event.currentTarget.className = 'error'
  }
  if (errors) {
    return (
      <section id="about">
        <div>{errors}</div>
      </section>
    )
  }
  if (validationErrors && validationErrors?.length > 0) {
    return (
      <section id="about">
        <ul className="social">
          {validationErrors.map(err => {
            console.log(err)
            return <li key={err.message}>{err.message}</li>
          })}
        </ul>
      </section>
    )
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
