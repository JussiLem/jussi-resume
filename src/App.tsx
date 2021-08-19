import React, { useEffect, useState } from 'react'
import './App.scss'
import { getUserMainData } from './mock-data'
import { MainDataFields } from './common'
import ErrorFallback from './components/ErrorFallback'
import Header from './components/Header'

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
      <div className="App">{mainData && <Header email={mainData.user.email} />}</div>
    </ErrorFallback>
  )
}

export default App
