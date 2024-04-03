import React, { useState, useEffect } from 'react';
import DataColumn from './dataColumn';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

function TableData() {

    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("starting fetch data")
            try {
                const response = await axios.get("http://localhost:5000/api/easy-rice");
                setData(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleCheckBox = (isChecked, itemId) => {
        if(isChecked) {
            setSelectedItems([...selectedItems, itemId])
        } else {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        }
    };

    return(
        <div className='flex flex-col w-full'>
            <div className={`${selectedItems.length >= 1 ? 'flex flex-row mb-10' : 'hidden'}`}>
                <div className='flex flex-row text-[#1F7B44] border border-[#1F7B44] px-5 py-2 rounded-lg font-bold hover:text-white hover:cursor-pointer hover:bg-[#1F7B44] hover:border-opacity-0 transition duration-200'>
                    <div className='flex items-center justify-center text-xl'>
                        <RiDeleteBin6Line />&nbsp;
                    </div>
                    <div className='flex items-center justify-center'>
                        Delete
                    </div>
                </div>
                <div className='flex justify-center items-center pl-2'>
                    <p>Selected items: {selectedItems.length}</p>
                </div>
            </div>
            <div className='flex flex-row items-center bg-[#1F7B44] w-full px-5 py-3 text-white rounded-t-lg'>
                <div className='flex w-[20%]'>
                    Create Date - Time
                </div>
                <div className='flex w-[20%]'>
                    Inspection ID
                </div>
                <div className='flex w-[20%]'>
                    Name
                </div>
                <div className='flex w-[20%]'>
                    Standard
                </div>
                <div className='flex w-[20%]'>
                    Note
                </div>
            </div>
            {
                data.map(item => (
                    <DataColumn createDate={item.createDate} inspectionID={item.inspectionID} name={item.name} standard={item.standardName} note={item.note} onCheckboxChange={(isChecked) => handleCheckBox(isChecked, item._id)} />
                ))
            }
            <div className='flex flex-row mt-5'>
                <div className='flex'>
                    1-10 of {data.length}
                </div>
                <div className='flex flex-row ml-5'>
                    <div className='flex items-center justify-center mr-5'>
                        <IoChevronBackSharp/>
                    </div>
                    <div className='flex items-center justify-center'>
                        <IoChevronForwardSharp/>    
                    </div>
                </div>
            </div>
            
            {/*
                <p>Selected items: {selectedItems.join(', ')}</p>
            */}
        </div>
    );
}

export default TableData;