import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import './layout.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  fab,
  faFacebook,
  faLinkedin,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { SocialFields } from '../common'
import { getUserSocialMediaData } from '../mock-data'

library.add(fab, faFacebook, faLinkedin, faTwitter, faGithub)

interface HeaderDetails {
  email: string
}
const Header = ({ email }: HeaderDetails) => {
  const [socialMedias, setSocialMedias] = useState<SocialFields[]>([])
  useEffect(() => {
    const handleStatusChange = () => {
      getUserSocialMediaData(email).then(socials => setSocialMedias(socials.social))
    }
    handleStatusChange()
  }, [email])

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
          {socialMedias.map(socialMedia => {
            return (
              <li key={`${socialMedia.name}`}>
                <FontAwesomeIcon icon={['fab', socialMedia.className]} color="#A8A8A8" />
                <a href={socialMedia.url}>{socialMedia.name}</a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Header
