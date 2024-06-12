import React from 'react';
import { NavBarContainer, NavBar, Crumbs, Crumb } from './StyledComponents'



const Navbar = () => {
  return (
    <NavBarContainer>
      <NavBar>
        <Crumbs>
          <Crumb href="/">Home</Crumb>
          <Crumb href="/accountdetails">Account Details</Crumb>
        </Crumbs>
      </NavBar>
    </NavBarContainer>
  );
};

export default Navbar;
