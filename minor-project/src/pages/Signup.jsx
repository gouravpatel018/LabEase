import React, { useState } from 'react'
import SignupComponent from "../components/Signup"
import LabRegister from '../components/LabRegister'
import RegisterSelector from '../components/RegisterSelector'

function Signup() {
  const [userType, setUserType] = useState("")
  return (
    <>
    {
      userType? userType === 'user'? <SignupComponent />: <LabRegister /> : <RegisterSelector setUserType={setUserType} />
    }
    </>
  )
}

export default Signup