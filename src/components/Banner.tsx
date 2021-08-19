import React from 'react'
import { UserFields } from '../common'
import SocialMedia from './SocialMedia'

interface BannerProps {
  user: UserFields
}

const Banner = ({ user }: BannerProps) => {
  const { occupation, description, address, name } = user
  const { city } = address
  return (
    <div className="row banner">
      <div className="banner-text">
        <h1 className="responsive-headline">I&rsquo;m {name}.</h1>
        <h3>
          I&rsquo;m a {city} based <span>{occupation}</span>. {description}.
        </h3>
        <hr />
        <SocialMedia user={user} />
      </div>
    </div>
  )
}

export default Banner
