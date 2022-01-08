import React from 'react'
import SocialMedia from './SocialMedia'

interface FooterDetails {
  userId: string
}

const Footer = ({ userId }: FooterDetails) => {
  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          {userId ? (
            <ul className="social-links">
              <SocialMedia userId={userId} />
            </ul>
          ) : (
            <></>
          )}

          <ul className="copyright">
            <li>&copy; Copyright 2021 Jussi Lemmetyinen</li>
            <li>
              Design by{' '}
              <a title="JussiLemmetyinen" href="https://jussilemmetyinen.me">
                JussiLemmetyinen
              </a>
            </li>
          </ul>
        </div>
        <div id="go-top">
          <a className="smoothscroll" title="Back to Top" href="#home">
            <i className="icon-up-open" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
