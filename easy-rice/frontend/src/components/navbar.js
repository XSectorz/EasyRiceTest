
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return(
        <div className='flex flex-row w-full h-20 bg-[#707070] items-center bg-opacity-10'>
            <Link to="/" className='flex font-bold text-2xl mx-36'>
                EASYRICE TEST
            </Link>
        </div>
    );
}

export default NavBar;
