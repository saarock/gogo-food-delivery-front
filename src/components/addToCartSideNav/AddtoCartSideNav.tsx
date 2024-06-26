import React from 'react'
import "./addtoCartSideNav.css";
import { IoLocation } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";
const AddtoCartSideNav = () => {
  const navItems = [
    {
      name: "add current location",
      icon: <IoLocation />
    },
    {
      name: "choose location",
      icon: <FaSearchLocation />
    }
  ]
  return (
    <div className='gogo-add-to-cart-sidenav'>
      <ul>
        {
          navItems.map((nav, index) => <li>

            <button key={index}>{nav.icon}{nav.name}</button>
          </li>)
        }
      </ul>
    </div>
  )
}

export default React.memo(AddtoCartSideNav)