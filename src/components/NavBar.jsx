import React from 'react';
import Link from 'next/link';
import { signOut , useSession } from 'next-auth/react';

const NavBar = () => {
    const {data:session} = useSession()
    if(session){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" href="/">The Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/api/auth/signout" onClick={()=> signOut}>sign out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
};

export default NavBar;