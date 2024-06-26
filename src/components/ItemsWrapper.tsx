import React from 'react'
import { ChildrenProps } from './ProtectedRoute'
import SideNav from './sidebar/SideNav'


const ItemsWrapper:React.FC<ChildrenProps> = ({children}) => {
  return (
    <div className='gogo__items__container'>
        <div className="gogo__items__sidebar">
            <SideNav/>
        </div>
        <div className="gogo__items">
            {children}
        </div>
    </div>
  )
}

export default ItemsWrapper