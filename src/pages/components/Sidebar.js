import { useEffect, useState } from "react";
import "../../css/Sidebar.css"
import { MDBBtn, MDBCollapse, MDBIcon } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

const menus = [
    { name: "Lista de paises", link: "/" },
    { name: "Lista de continentes", link: "/continentes" },
    { name: "Vista 1", link: "/vista-1" },
    { name: "Vista 2", link: "/vista-2" },
    { name: "Vista 3", link: "/vista-3" }
];


function Sidebar() {
    const [isActiveMenu, setIsActiveMenu] = useState(false);
    const showMenu = () => setIsActiveMenu(!isActiveMenu);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
    });

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <>
            <MDBBtn size='lg' floating style={{ backgroundColor: '#0082ca' }} className='d-block d-md-none position-absolute top-0 end-0' onClick={showMenu}>
                <MDBIcon fas icon="bars" />
            </MDBBtn>

            <MDBCollapse show={isActiveMenu || (windowWidth >= 768)} tag={"nav"} className={"col-sm-12 col-md-3 d-md-block " + (windowWidth >= 768 && "vh-100")} style={{ backgroundColor: "#676767" }}>
                <span
                    style={{
                        borderRadius: "6px",
                        alignItems: "center",
                        display: "flex",
                        height: "50px",
                        justifyContent: "center",
                        background: "#DBDBDB",
                        color: "#676767",
                        fontWeight: "bold",
                        marginTop: "1rem",
                        marginBottom: "1rem"
                    }}
                >
                    Logo
                </span>

                <ul className="nav flex-column" style={{ paddingBottom: '1rem' }}>
                    {
                        menus.map((item, index) => (
                            <li className="item_link" key={index}>
                                <NavLink to={item.link} caseSensitive className={({ isActive }) => (isActive ? 'nav-item-selected' : 'nav-link nav-item-normal')}>
                                    {item.name}
                                </NavLink>

                            </li>
                        ))
                    }

                </ul>

            </MDBCollapse>

        </>
    );

}

export default Sidebar;