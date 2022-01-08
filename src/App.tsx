import React, { Suspense, useEffect, useState } from 'react'
import './components/layout.scss'
import './components/defaults.scss'
import { getUserFromDb } from './mock-data'
import { UserBasicData } from './common'
import ErrorFallback from './components/ErrorFallback'

const Header = React.lazy(() => import('./components/Header'))
const Footer = React.lazy(() => import('./components/Footer'))
const About = React.lazy(() => import('./components/About'))
const Resume = React.lazy(() => import('./components/Resume'))

const App = () => {
  const [mainData, setMainData] = useState<UserBasicData | null>(null)
  useEffect(() => {
    const handleStatusChange = async () => {
      await getUserFromDb('jussi@jussi.com')
        .then(main => {
          if (main) {
            return setMainData(main)
          }
          return null
        })
        .catch(error => {
          throw Error(`Failed to receive main data: ${error}`)
        })
    }
    handleStatusChange().catch(e => console.error(e))
  }, [])

  return (
    <ErrorFallback>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          {mainData && (
            <>
              <Header userId={mainData.userId} />
              <About userId={mainData.userId} />
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
