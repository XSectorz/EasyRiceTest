import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";

function ViewResults() {
    return(
        <div className=" bg-[#FAFAFA] h-screen">
            <div className='flex flex-col w-full'>
                <div className="flex">
                    <NavBar/>
                </div>
            </div>
        </div>
    );
}

export default ViewResults;