import React from 'react'
import TopBar from '../components/TopBar'
import Items from '../components/Items'
import Chains from '../components/Chains'
import FirmCollections from '../components/FirmCollections'
import Productmenu from '../components/Productmenu'

const Landingpage = () => {
  return (
    <div>
        <TopBar/>
        <div className="landingsection">
        <Items/>
        <Chains/>
        <FirmCollections/>
        </div>
    </div>
  )
}

export default Landingpage