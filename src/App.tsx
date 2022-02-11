import React, { Suspense, useEffect, useState } from 'react'
import './components/layout.scss'
import './components/defaults.scss'
import { isLeft, isRight } from 'fp-ts/es6/Either'
import { ValidationError } from 'io-ts/es6'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  fab,
  faFacebook,
  faLinkedin,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { getUserFromDb } from './mock-data'
import { parseUserBasicData, UserBasicData } from './common'
import ErrorFallback from './components/ErrorFallback'

library.add(fab, faFacebook, faLinkedin, faTwitter, faGithub)

const Header = React.lazy(() => import('./components/Header'))
const Footer = React.lazy(() => import('./components/Footer'))
const About = React.lazy(() => import('./components/About'))
const Resume = React.lazy(() => import('./components/Resume'))

const App = () => {
  const [user, setUser] = useState<string>('jussi@jussi.com')
  const [mainData, setMainData] = useState<UserBasicData | null>(null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>()
  const [errors, setErrors] = useState<string>()

  useEffect(() => {
    const handleStatusChange = async () => {
      try {
        const data = await getUserFromDb(user)
        const parsed = JSON.parse(data)
        const basicData = parseUserBasicData(parsed)
        if (isRight(basicData)) {
          setMainData(basicData.right)
        }
        if (isLeft(basicData)) {
          setValidationErrors(basicData.left)
        }
      } catch (err: unknown) {
        setErrors(`Error happened: ${err}`)
      }
    }
    handleStatusChange()
  }, [user])
  return (
    <ErrorFallback>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          {/* <ul>
            {validationErrors &&
              validationErrors.length > 0 &&
              validationErrors.map((err: ValidationError) => {
                return <li key={err.message}>error: {err.message}</li>
              })}
          </ul>
          <>{errors && <div>{errors}</div>}</> */}
          {mainData && (
            <>
              <Header userId={mainData.userId} />
              <About userId={mainData.userId} email={mainData.email} />
              <Resume userId={mainData.userId} />
              <Footer userId={mainData.userId} />
            </>
          )}
        </div>
      </Suspense>
    </ErrorFallback>
  )
}

export default App
