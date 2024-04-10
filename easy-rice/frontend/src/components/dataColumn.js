import React, { useState } from "react";
import { Link } from "react-router-dom";


function DataColumn({ createDate, inspectionID, name, standard, note, onCheckboxChange }) {

    const [isClicked, setIsClicked] = useState(false);

    const handleCheckBox = () => {
        const newVal = !isClicked;
        setIsClicked(newVal);
        onCheckboxChange(newVal)
    };

    const dateTime = new Date(createDate);
    const dateStr = dateTime.getDate().toString().padStart(2, '0') + "/" + (dateTime.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTime.getFullYear() + " " + dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();

    return (
        <div className='flex flex-row items-center border border-[#A8A8A8] border-t-0 w-full px-5 py-3'>
            <div className='flex flex-row w-[20%]'>
                <div className="flex">
                    <input className=" accent-[#1F7B44]" type="checkbox" id="dataCheckBox" name="dataCheckBox" checked={isClicked} onChange={handleCheckBox} />&nbsp;
                </div>
                <Link to={`/view/${inspectionID}`} className="flex">
                    {dateStr}
                </Link>
            </div>
            <Link to={`/view/${inspectionID}`} className="flex flex-row w-[80%] h-full">
                <div className='flex w-[25%]'>
                    {inspectionID}
                </div>
                <div className='flex w-[25%]'>
                    {name}
                </div>
                <div className='flex w-[25%]'>
                    {standard}
                </div>
                <div className='flex w-[25%]'>
                    {note}
                </div>
            </Link>
        </div>
    )
}

export default DataColumn;