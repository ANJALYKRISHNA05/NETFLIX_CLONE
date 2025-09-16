import React, { useRef, useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/asset/logo.png'
import search_icon from '../../assets/asset/search_icon.svg'
import bell_icon from '../../assets/asset/bell_icon.svg'
import profile_img from '../../assets/asset/profile_img.png'
import caret_icon from '../../assets/asset/caret_icon.svg'
import { logout } from '../../firebase'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const navRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark')
      } else {
        navRef.current.classList.remove('nav-dark')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='navbar' ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>
            <Link to="/watchlist" style={{ textDecoration: "none", color: "inherit" }}>
              My Watchlist
            </Link>
          </li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      <div className='navbar-right'>
        <img src={search_icon} alt="" className='icons'/>
        <p>Children</p>
        <img src={bell_icon} alt="" className='icons'/>
        <div className="navbar-profile">
          <img src={profile_img} alt="" className='icons'/>
          <img src={caret_icon} alt=""/>
          <div className="dropdown">
            <p onClick={() => { logout() }}>Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
