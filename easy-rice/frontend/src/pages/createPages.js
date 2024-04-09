import React, { useState, useEffect } from "react";
import NavBar from '../components/navbar';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/system';
import { IoCalendarClearOutline } from "react-icons/io5";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { Link } from 'react-router-dom';
import axios from "axios";
import {v4 as uuidv4} from 'uuid';

function CreatePage() {

    const Input = styled('input')({
        display:
         'none',
      });

    const fetchStandardOption = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/easy-rice/standard');
            const data = response.data;

            const options = data.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ));

            setStandardData(data);
            setOptions(options);
        } catch(err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchStandardOption();
      }, []);

    const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    };

    const handleSelectStandard = (event) => {
        setStandardSelect(event.target.value);
    };

    const [ warnName, setWarnName ] = useState(false);
    const [ warnStandard, setwarnStandard ] = useState(false);
    const [ name , setName ] = useState("");
    const [ note , setNote ] = useState("");
    const [ price , setPrice ] = useState("");
    const [ standardData , setStandardData ] = useState(null);
    const [standardSelect , setStandardSelect ] = useState("");
    const [options , setOptions ] = useState(null);
    const [samplingDate, setSamplingDate] = useState(null);

    const [checkedItems, setCheckedItems] = useState({
        front_end: false,
        back_end: false,
        other: false,
      });
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleChange = (event) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSubmit = async () => {
     //   console.log("Note: ",note);
     //   console.log("Price: ",price);

        if(name) {
            setWarnName(false);
      //      console.log("Name: ",name);
        } else {
            setWarnName(true);
        }

        if (selectedFile) {
            const reader = new FileReader();
            /*reader.onload = (event) => {
                const jsonData = event.target.result;
                console.log("StandardSelectFile:", jsonData);
            };*/
            reader.readAsText(selectedFile);
        } else {
       //     console.log("StandardSelectFile: NOT SELECT");
        }

        const { front_end, back_end, other } = checkedItems;
       // console.log("FrontEnd:", item1);
       // console.log("BackEnd:", item2); 
       // console.log("Other:", item3);
       // console.log("Date:", samplingDate);

        if(standardSelect || selectedFile) {
            setwarnStandard(false);
        //    console.log("Standard: ",standardSelect);
        } else {
            setwarnStandard(true);
        }

        if(warnName || warnStandard) {
            return;
        }

        let dataSampling = [];

        if(front_end) {
            dataSampling.push("Front End");
        }
        if(back_end) {
            dataSampling.push("Back End");
        }
        if(other) {
            dataSampling.push("Other");
        }
        
        let samplingTime = "";

        if(samplingDate) {
            samplingTime = samplingDate.toISOString()
        }

        const desiredStandard = standardData.find(standard => standard.id === standardSelect);
        const data = {name: name,createDate: new Date().toISOString(), inspectionID: uuidv4(), standardID: desiredStandard.id, note: note, standardName: desiredStandard.name, samplingDate: samplingTime, samplingPoint: dataSampling, price: price, standardData: desiredStandard.standardData};
        //const dataJson = JSON.stringify(data);

        await axios.post('http://localhost:5000/api/easy-rice/create', data);
        //console.log(dataJson);
    }



    const handleInputName = (event) => {
        setName(event.target.value);
    }

    const handleInputNote = (event) => {
        setNote(event.target.value);
    }

    const handleInputPrice = (event) => {
        setPrice(event.target.value);
    }

    return (
        <div className=" bg-[#FAFAFA] h-screen">
            <div className='flex flex-col w-full'>
                <div className="flex">
                    <NavBar/>
                </div>
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <div className="flex text-[40px]" style={{fontWeight: 500}}>
                        Create Inspection
                    </div>
                    <div className="flex flex-col w-[30%] h-full bg-white mt-5 px-5">
                        <div className="flex flex-col mt-3">
                            <div className="flex text-lg font-bold">
                                Name*
                            </div>
                            <div className={`flex border-2 rounded-md text-lg font-bold px-3 mt-2 ${warnName ? 'border-[#D91212]' : 'border-[#A8A8A8]'}`}>
                                <input className=" w-full py-2 focus:outline-none rounded-md text-[#909090]" id="name" type="text" placeholder="Please Holder" onChange={handleInputName}/>
                            </div>
                            <div className={`text-[#D91212] ${warnName ? 'flex' : 'hidden'}`}>
                                required
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <div className="flex text-lg font-bold">
                                Standard*
                            </div>
                            <div className={`flex border-2 rounded-md text-lg font-bold px-3 mt-2 ${warnStandard ? 'border-[#D91212]' : 'border-[#A8A8A8]'}`}>
                                <select className={`w-full py-2 focus:outline-none rounded-md text-[#909090] ${warnStandard ? 'text-red-600' : 'text-gray-500'} `}  defaultValue="none" onChange={handleSelectStandard}> 
                                    <option value="none" disabled>Please Select Standard</option> 
                                    {options}
                                </select> 
                            </div>
                            <div className={`text-[#D91212] ${warnStandard ? 'flex' : 'hidden'}`}>
                                required
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <div className="flex text-lg font-bold">
                                Upload File
                            </div>
                            <div className="flex border-2 border-[#A8A8A8] rounded-md text-lg font-bold px-3 mt-2 py-2">
                                <Input
                                    id="file-upload"
                                    accept=".json"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="file-upload" className="w-full text-[#909090]">
                                    <div>
                                        {selectedFile ? selectedFile.name : 'Upload JSON File'}
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="flex h-[1px] w-full mt-5 bg-[#A8A8A8]"/>
                        <div className="flex flex-col mt-2">
                            <div className="flex text-lg font-bold">
                                Note
                            </div>
                            <div className="flex border-2 border-[#A8A8A8] rounded-md text-lg font-bold px-3 mt-2">
                                <input className=" w-full py-2 focus:outline-none rounded-md text-[#909090]" id="note" type="text" placeholder="Please Holder" onChange={handleInputNote}/>
                            </div>
                        </div>
                        <div className="flex flex-col mt-2">
                            <div className="flex text-lg font-bold">
                                Price
                            </div>
                            <div className="flex border-2 border-[#A8A8A8] rounded-md text-lg font-bold px-3 mt-2">
                                <input className=" w-full py-2 focus:outline-none rounded-md text-[#909090]" id="price" type="text" placeholder="10,000" onChange={handleInputPrice}/>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5">
                            <div className="flex text-lg font-bold">
                                Sampling Point
                            </div>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <FormControlLabel
                                    control={<Checkbox checked={checkedItems.front_end} onChange={handleChange} name="front_end" />}
                                    label="Front End"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkedItems.back_end} onChange={handleChange} name="back_end" />}
                                    label="Back End"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkedItems.other} onChange={handleChange} name="other" />}
                                    label="Other"
                                />
                            </Box>
                        </div>
                        <div className="flex flex-col mt-2">
                            <div className="flex text-lg font-bold">
                                Date/Time of Sampling
                            </div>
                            <Box display="flex" marginTop="5px">
                                <DateTimePicker slots={{openPickerIcon: IoCalendarClearOutline}} views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']} format='D/M/YYYY HH:mm:ss' className='flex w-full text-xl' value={samplingDate} onChange={setSamplingDate}
                                sx={{ border: '1px solid #A8A8A8', borderRadius: '6px' }}/>
                            </Box>
                        </div>
                        <Box display="flex" flexDirection="row" marginTop="10px" justifyContent="flex-end">
                            <Link to="/">
                                <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                marginRight="10px"
                                sx={{
                                    border: '2px solid #1F7B44',
                                    borderRadius: '8px',
                                    paddingY: '7px',
                                    paddingX: '18px',
                                    color: '#1F7B44',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease-in-out',
                                    "&:hover": {
                                        backgroundColor: "#1F7B44",
                                        color: "white"
                                    }
                                }}
                                >
                                Cancel
                                </Box>
                            </Link>
                            <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                border: '2px solid white',
                                borderRadius: '8px',
                                paddingY: '7px',
                                paddingX: '18px',
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                backgroundColor: '#1F7B44',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease-in-out',
                                "&:hover": {
                                    backgroundColor: "white",
                                    color: "#1F7B44",
                                    border: '2px solid #1F7B44'
                                }
                            }}
                            onClick={handleSubmit}
                            >
                            Submit
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePage;