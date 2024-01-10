import React from 'react'
import CoinSearch from '../components/CoinSearch'

const Home = ({coins}) => {
  return (
    <CoinSearch coins={coins}/>
  )
}

export default Home