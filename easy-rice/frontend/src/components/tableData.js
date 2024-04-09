import React, { useState, useEffect } from 'react';
import DataColumn from './dataColumn';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

function TableData({ searchID, startDate, endDate, page, setPage }) {

    const [dataSize, setDataSize] = useState(0);
    const [dataFilter, setDataFilter] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [startIndex,setStartIndex] = useState(0);
    const [endIndex,setEndIndex] = useState(0);

    const fetchData = async () => {
       // console.log("starting fetch data")
        try {
            //console.log("PAGE: ",page);
            const response = await axios.get("http://localhost:5000/api/easy-rice/history/?pages=" + page);
            setDataSize(response.data.dataSize);
            setDataFilter(response.data.data);

            if(response.data.dataSize >= 1) {
                setStartIndex(response.data.startIndex+1);
            } else {
                setStartIndex(response.data.startIndex);
            }
            setEndIndex(response.data.endIndex);
        } catch (err) {
            console.log(err);
        }
    };



    const nextPageHandler = async () => {

        if(endIndex < dataSize) {
            //console.log("Next page");
            setPage(page+1);
        }
    };

    const fecthDataHandler = () => {
        if(!searchID && !startDate && !endDate) {
            fetchData();
            return;
        }
    
        fetchDataFromFilter();
    }

    const prevPageHandler = async () => {
        if(page > 1) {
            //console.log("Prev Page");
            setPage(page-1);
        }
    };

    const deleteHandler = async () => {
        try {
            
            for(let id of selectedItems) {
                await axios.delete("http://localhost:5000/api/easy-rice/history/" + id);
            }

            if(dataSize - selectedItems.length <= (page-1)*10) {
                setPage(page-1);
            }

            setSelectedItems([]);
            fecthDataHandler();
        } catch(err) {
            console.log(err);
        }
    }

    const fetchDataFromFilter = async () => {
        try {
            let fromDateObj = "";
            let toDateObj = "";

            if(startDate) {
                fromDateObj = startDate;
            }
            if(endDate) {
                toDateObj = endDate;
            }

           // console.log("URL: " + "http://localhost:5000/api/easy-rice/history/?fromDate=" + fromDateObj + "&toDate=" + toDateObj + "&inspectionID=" + searchID + "&pages=" + page);
            const response = await axios.get("http://localhost:5000/api/easy-rice/history/?fromDate=" + fromDateObj + "&toDate=" + toDateObj + "&inspectionID=" + searchID + "&pages=" + page);
            
            if (response.status === 404) {
                setDataFilter("");
                console.log("Not Found");
                return;
            }

            setDataFilter(response.data.data);
            setDataSize(response.data.dataSize);

            if(response.data.dataSize >= 1) {
                setStartIndex(response.data.startIndex+1);
            } else {
                setStartIndex(response.data.startIndex);
            }
        
            setEndIndex(response.data.endIndex);
        } catch (err) {


            console.log(err);
        }
    };


    useEffect(() => {
        //console.log("Data changed ", searchID);
        //console.log("start changed ", startDate);
        //console.log("end changed ", endDate);
        fecthDataHandler();
    }, [searchID,startDate,endDate,page]);

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
                <div className='flex flex-row text-[#1F7B44] border border-[#1F7B44] px-5 py-2 rounded-lg font-bold hover:text-white hover:cursor-pointer hover:bg-[#1F7B44] hover:border-opacity-0 transition duration-200' onClick={deleteHandler}>
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
                dataFilter && dataFilter.map(item => (
                    <DataColumn key={item._id} createDate={item.createDate} inspectionID={item.inspectionID} name={item.name} standard={item.standardName} note={item.note} onCheckboxChange={(isChecked) => handleCheckBox(isChecked, item._id)} />
                ))
            }
            <div className='flex flex-row mt-5'>
                <div className='flex'>
                    {startIndex}-{endIndex} of {dataSize}
                </div>
                <div className='flex flex-row ml-5'>
                    <div className={`flex items-center justify-center mr-4 ${page > 1 ? 'cursor-pointer' : 'text-[#909090]'} `} onClick={prevPageHandler}>
                        <IoChevronBackSharp/>
                    </div>
                    <div className={`flex items-center justify-center ${endIndex < dataSize ? 'cursor-pointer' : 'text-[#909090]'}`} onClick={nextPageHandler}>
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