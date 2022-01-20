import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isLeft, isRight } from 'fp-ts/es6/Either'
import { IconName } from '@fortawesome/free-brands-svg-icons'
import { ValidationError } from 'io-ts'
import { parseSocialMedias, SocialMediasData } from '../common'
import { getUserSocialMediaData } from '../mock-data'

const handleSocialMediaData = async (userId: string) => {
  try {
    const raw = await getUserSocialMediaData(userId)
    return parseSocialMedias(JSON.parse(raw))
  } catch (e) {
    throw Error(e)
  }
}

interface SocialMediaProps {
  userId: string
}
const SocialMedia = ({ userId }: SocialMediaProps) => {
  const [socialMedias, setSocialMedias] = useState<SocialMediasData | null>(null)
  const [errors, setErrors] = useState<Error>()
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>()

  useEffect(() => {
    const handleStatusChange = async () => {
      try {
        const socialMediaData = await handleSocialMediaData(userId)
        if (isRight(socialMediaData)) {
          setSocialMedias(socialMediaData.right)
        }
        if (isLeft(socialMediaData)) {
          setValidationErrors(socialMediaData.left)
        }
      } catch (e) {
        setErrors(errors)
      }
    }
    handleStatusChange()
  }, [userId, errors])

  if (errors) {
    return (
      <ul className="social">
        <div>{errors.message}</div>
      </ul>
    )
  }
  if (validationErrors) {
    return (
      <ul className="social">
        {validationErrors?.map(err => {
          return (
            <ul className="social">
              <li key={err.message}>{err.message}</li>
            </ul>
          )
        })}
      </ul>
    )
  }
  return (
    <ul className="social">
      {socialMedias?.social.map(social => {
        const className = social.className as IconName
        if (social.socialMediaId && social.name && social.url) {
          return (
            <li key={`${social.name}`}>
              <a href={social.url} aria-label={social.name}>
                <FontAwesomeIcon icon={['fab', className]} color="#A8A8A8" />
              </a>
            </li>
          )
        }
        return <></>
      })}
    </ul>
  )
}

export default SocialMedia
