import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SocialFields } from '../common'

interface BannerProps {
  name: string
  city: string
  occupation: string
  description: string
  socialMedias: SocialFields[]
}

const Banner = ({ name, city, occupation, description, socialMedias }: BannerProps) => {
  return (
    <div className="row banner">
      <div className="banner-text">
        <h1 className="responsive-headline">I&rsquo;m {name}.</h1>
        <h3>
          I&rsquo;m a {city} based <span>{occupation}</span>. {description}.
        </h3>
        <hr />
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
      </div>
    </div>
  )
}

export default Banner
