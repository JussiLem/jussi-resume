import React, { useEffect, useState } from 'react'
import './components/layout.scss'
import './components/defaults.scss'
import { getUserMainData } from './mock-data'
import { MainDataFields } from './common'
import ErrorFallback from './components/ErrorFallback'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [mainData, setMainData] = useState<MainDataFields | null>(null)
  useEffect(() => {
    const handleStatusChange = async () => {
      await getUserMainData('Jussi@Jussi.com')
        .then(main => {
          return setMainData(main)
        })
        .catch(error => {
          throw Error(`Failed to receive main data: ${error}`)
        })
    }
    handleStatusChange().catch(e => console.error(e))
  }, [])

  return (
    <ErrorFallback>
      <div className="App">
        {mainData && (
          <>
            <Header user={mainData.user} />
            <About user={mainData.user} />
            <Footer user={mainData.user} />
          </>
        )}
      </div>
    </ErrorFallback>
  )
}

export default App
