import React, { useEffect, useState } from 'react'
import { isRight } from 'fp-ts/es6/Either'
import SocialMedia from './SocialMedia'
import { handleAboutData } from './About'

interface BannerProps {
  userId: string
}

const Banner = ({ userId }: BannerProps) => {
  const [occupation, setOccupation] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  useEffect(() => {
    const handleStatusChange = async () => {
      const bioData = await handleAboutData(userId)
      if (isRight(bioData)) {
        const receivedOccupation = bioData.right.occupation || null
        const receivedDescription = bioData.right.description || null
        const receivedCity = bioData.right.address?.city || null
        const receivedName = bioData.right.name || null
        setOccupation(receivedOccupation)
        setDescription(receivedDescription)
        setCity(receivedCity)
        setName(receivedName)
        return Promise.resolve()
      }
      return Promise.resolve()
    }
    handleStatusChange()
  }, [userId])
  return (
    <div className="row banner">
      <div className="banner-text">
        <h1 className="responsive-headline">I&rsquo;m {name}.</h1>
        <h3>
          I&rsquo;m a {city} based <span>{occupation}</span>. {description}.
        </h3>
        <hr />
        <SocialMedia userId={userId} />
      </div>
    </div>
  )
}

export default Banner
