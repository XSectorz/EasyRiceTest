import React, { useState } from "react";


function DataColumn({ createDate, inspectionID, name, standard, note, onCheckboxChange }) {

    const [isClicked, setIsClicked] = useState(false);

    const handleCheckBox = () => {
        const newVal = !isClicked;
        setIsClicked(newVal);
        onCheckboxChange(newVal)
    };

    return (
        <div className='flex flex-row items-center border border-[#A8A8A8] border-t-0 w-full px-5 py-3'>
            <div className='flex flex-row w-[20%]'>
                <div className="flex">
                    <input className=" accent-[#1F7B44]" type="checkbox" id="dataCheckBox" name="dataCheckBox" checked={isClicked} onChange={handleCheckBox} />&nbsp;
                </div>
                <div className="flex">
                    {createDate}
                </div>
            </div>
            <div className='flex w-[20%]'>
                {inspectionID}
            </div>
            <div className='flex w-[20%]'>
                {name}
            </div>
            <div className='flex w-[20%]'>
                {standard}
            </div>
            <div className='flex w-[20%]'>
                {note}
            </div>
        </div>
    )
}

export default DataColumn;