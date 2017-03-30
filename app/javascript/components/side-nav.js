import React, {PropTypes} from 'react';
import { Link } from 'react-router'

export default function SideNav(props) {
  return (
      <div className="fl w-20 pa2 mt2">
        <div className="mb4">
          <Link to="/compose" className="f6 link dim bn ph3 pv2 bg-light-purple white">Compose</Link>
        </div>
        <Link to="/" className="db pv2 link">Letters</Link>
        <Link to="/drafts" className="db pv2 link">Drafts</Link>
        <Link to="/lists" className="db pv2 link">Lists</Link>
        <Link to="/settings" className="db pv2 link black">Settings</Link>
      </div>
  )
}
