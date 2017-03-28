import React from 'react';
import { Link } from 'react-router'

export default function Nav(props) {
  return (
    <nav className="dt pa3 v-mid w-100 border-box bg-light-gray">
      <Link to="/" className="dtc w-25 black link">Marmoset</Link>
      <div className="dtc v-mid w-75 tr">
        <Link to="/login" className="link dib mr3 black">Log in</Link>
        <Link to="/signup" className="link dib mr3 black">Sign up</Link>
      </div>
    </nav>
  )
}
