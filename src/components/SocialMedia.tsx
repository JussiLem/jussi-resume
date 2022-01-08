import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SocialFields } from '../common'
import { getUserSocialMediaData } from '../mock-data'

interface SocialMediaProps {
  userId: string
}
const SocialMedia = ({ userId }: SocialMediaProps) => {
  const [socialMedias, setSocialMedias] = useState<SocialFields[]>([])
  useEffect(() => {
    const handleStatusChange = () => {
      getUserSocialMediaData(userId).then(socials => setSocialMedias(socials.social))
    }
    handleStatusChange()
  }, [userId])

  return (
    <ul className="social">
      {socialMedias.map(socialMedia => {
        return (
          <li key={`${socialMedia.name}`}>
            <a href={socialMedia.url} aria-label={socialMedia.name}>
              <FontAwesomeIcon icon={['fab', socialMedia.className]} color="#A8A8A8" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialMedia
