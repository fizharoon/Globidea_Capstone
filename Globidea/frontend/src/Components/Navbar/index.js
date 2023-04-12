import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                Welcome
            </NavLogo>
            <Bars />

            <NavMenu>
                
                <NavLink 
                  to="/phase1"
                  activeStyle={{ color: 'black' }}
                >
                    Phase 1
                </NavLink>
                <NavLink 
                  to="/phase2" 
                  activeStyle={{ color: 'black' }}
                >
                    Phase 2
                </NavLink>
                <NavLink
                  to="/phase3"
                  activeStyle={{ color: 'black' }}
                >
                    Phase 3
                </NavLink>

                <NavLink
                  to="/phase4"
                  activeStyle={{ color: 'black' }}
                >
                    Phase 4
                </NavLink>

                <NavLink
                  to="/phase5"
                  activeStyle={{ color: 'black' }}
                >
                    Phase 5
                </NavLink>


                <NavBtn>
                    {/* <NavBtnLink to="/signin">Admin Sign In</NavBtnLink> */}
                    <NavBtnLink to="/adminsignin">Admin Sign In</NavBtnLink>

                </NavBtn>
            </NavMenu>
           </Nav> 
        </>
    );
};
export default Navbar;