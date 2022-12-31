import React, { useEffect, useState } from 'react'

import { config } from 'config/config'
import { signInWithGoogle } from 'lib/data/firebase'

const LoginForm = () => {
  return (
    <div>
      <h1>Log in to {config.appName}</h1>
      <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
    </div>
  )
}

export default LoginForm
