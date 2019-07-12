import React from 'react';

const SideNavBar = ({authenticated, user, showSideBar}) => {
  if(authenticated && showSideBar) 
  return (
    <div className="sideBar">
      <h3>side bar</h3>
    </div>
  )
}

export default SideNavBar;