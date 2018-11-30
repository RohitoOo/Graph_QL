import React from 'react'
import {Navbar, NavItem} from 'react-materialize'


const NavbarComponent = () => (
    <div>
        <Navbar brand='Rohito' left>
            <NavItem target="_blank" href="https://github.com/RohitoOo/Graph_QL"> <a target="_blank" href="https://github.com/RohitoOo/Graph_QL">  Source Code </a> </NavItem>
            <NavItem > <a target="_blank" href="http://www.rohito.com">Personal Portfolio </a> </NavItem>
        </Navbar>
    </div>
)

export default NavbarComponent
