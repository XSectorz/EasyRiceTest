import React, { useState} from "react";
import NavBar from '../components/navbar';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/system';
import { IoCalendarClearOutline } from "react-icons/io5";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { Link } from 'react-router-dom';

function CreatePage() {

    const Input = styled('input')({
        display:
         'none',
      });

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
    const [ standardSelect , setStandardSelect ] = useState(null);
    const [samplingDate, setSamplingDate] = useState(null);
    const [checkedItems, setCheckedItems] = useState({
        item1: false,
        item2: false,
        item3: false,
      });
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleChange = (event) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSubmit = () => {
        console.log("Note: ",note);
        console.log("Price: ",price);

        if(name) {
            setWarnName(false);
            console.log("Name: ",name);
        } else {
            setWarnName(true);
        }

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const jsonData = event.target.result;
                console.log("StandardSelectFile:", jsonData);
            };
            reader.readAsText(selectedFile);
        } else {
            console.log("StandardSelectFile: NOT SELECT");
        }

        const { item1, item2, item3 } = checkedItems;
        console.log("FrontEnd:", item1);
        console.log("BackEnd:", item2); 
        console.log("Other:", item3);
        console.log("Date:", samplingDate);

        if(standardSelect || selectedFile) {
            setwarnStandard(false);
            console.log("Standard: ",standardSelect);
        } else {
            setwarnStandard(true);
        }

        if(warnName || warnStandard) {
            return;
        }
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
                                <select className={`w-full py-2 focus:outline-none rounded-md text-[#909090] ${warnStandard ? 'text-red-600' : 'text-gray-500'} `}  value={standardSelect} onChange={handleSelectStandard}> 
                                    <option value="none" selected disabled>Please Select Standard</option> 
                                    <option value="free">0</option> 
                                    <option value="starter">1 </option> 
                                    <option value="professional">2</option> 
                                    <option value="corporate">3</option> 
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
                                    control={<Checkbox checked={checkedItems.item1} onChange={handleChange} name="item1" />}
                                    label="Front End"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkedItems.item2} onChange={handleChange} name="item2" />}
                                    label="Back End"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkedItems.item3} onChange={handleChange} name="item3" />}
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