import React, { useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  fab,
  faFacebook,
  faLinkedin,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { SocialFields, UserFields } from '../common'
import { getUserSocialMediaData } from '../mock-data'
import Banner from './Banner'

library.add(fab, faFacebook, faLinkedin, faTwitter, faGithub)

interface HeaderDetails {
  user: UserFields
}

const Header = ({ user }: HeaderDetails) => {
  const [socialMedias, setSocialMedias] = useState<SocialFields[]>([])
  useEffect(() => {
    const handleStatusChange = () => {
      getUserSocialMediaData(user.email).then(socials => setSocialMedias(socials.social))
    }
    handleStatusChange()
  }, [user.email])

  return (
    <header id="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#resume">
              Resume
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#portfolio">
              Works
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#testimonials">
              Testimonials
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <Banner
        city={user.address.city}
        name={user.name}
        description={user.description}
        occupation={user.occupation}
        socialMedias={socialMedias}
      />
    </header>
  )
}

export default Header
