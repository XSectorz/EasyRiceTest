import React, { useState, useEffect} from "react";
import NavBar from "../components/navbar";
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { IoCalendarClearOutline } from "react-icons/io5";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import dayjs from 'dayjs';

function EditPages() {

    const { inspectionID } = useParams();
    const navigate = useNavigate();

    const [ inspection , setInspection ] = useState(null);
    const [samplingDate, setSamplingDate] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const fetchData = async () => {
        let response;
        try {
            response = await axios.get("http://localhost:5000/api/easy-rice/history/" + inspectionID);
            setInspection(response.data);
            //setSamplingDate(new Date(response.data[0].samplingDate));
            const samplingDate = dayjs(new Date(response.data[0].samplingDate));
            setSamplingDate(samplingDate);

            if (response.data[0].samplingPoint.includes("Front End")) {
                setValue("option1", true);
            }
            if (response.data[0].samplingPoint.includes("Back End")) {
                setValue("option2", true);
            }
            if (response.data[0].samplingPoint.includes("Other")) {
                setValue("option3", true);
            }
        } catch (err) {
            if(err.response.status === 404) {
               navigate("/");
               return;
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    },[]);


    const onSubmit = async (data) => {
        console.log(data);
        console.log(samplingDate.toISOString());
        console.log("Data:",Number(getValues("price").replace(/,/g,"")).toLocaleString());

        if(inspection) {
            const updatedInspection = [...inspection];
            updatedInspection[0].note = data.note;
            updatedInspection[0].price = Number(data.price.replace(/,/g,""));
            updatedInspection[0].samplingDate = samplingDate.toISOString();
            let dataSampling = [];

            if(data.option1) {
                dataSampling.push("Front End");
            } else if(data.option2) {
                dataSampling.push("Back End");
            } else if(data.option3) {
                dataSampling.push("Other");
            }

            updatedInspection[0].samplingPoint = dataSampling;
            setInspection(updatedInspection);
        }

        try {
            const response = await axios.put("http://localhost:5000/api/easy-rice/history/" + inspectionID, inspection);
            console.log("Update success:", response);
            navigate("/view/"+inspectionID);
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    return(
        <div className=" bg-[#FAFAFA] h-screen">
            <div className='flex flex-col w-full'>
                <div className="flex">
                    <NavBar/>
                </div>
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <div className="flex text-[30px] mt-5" style={{fontWeight: 500}}>
                        Edit Inspection ID : {inspectionID}
                    </div>
                    <div className="flex flex-col w-[30%] h-full bg-white mt-5 px-5 shadow-lg rounded-md">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control flex flex-col mt-3">
                                <label className="flex" style={{fontWeight: 500}}>Note</label>
                                <div className={`flex border-2 rounded-md text-lg font-bold px-3 mt-2 border-[#A8A8A8]`}>
                                    {
                                        inspection && <input className="flex w-full py-2 focus:outline-none rounded-md" type="text" defaultValue={inspection[0].note} 
                                        {...register("note")}/>
                                    }
                                </div>
                                <label className="flex mt-5" style={{fontWeight: 500}}>Price</label>
                                <div className={`flex border-2 rounded-md text-lg font-bold px-3 mt-2 border-[#A8A8A8] ${errors.price ? 'border-[#D91212]' : 'border-[#A8A8A8]'}`}>
                                    {
                                        inspection && <input className="flex w-full py-2 focus:outline-none rounded-md" type="text" defaultValue={inspection[0].price.toLocaleString()} 
                                        {...register("price", { validate: value => value.toLocaleString() === Number(getValues("price").replace(/,/g,"")).toLocaleString() })}/>
                                    }
                                </div>
                                {errors.price && <div className="flex text-red-500">Only number with commas</div>}
                                <label className="flex mt-5" style={{fontWeight: 500}}>Sampling Point</label>
                                <div className={`flex flex-row rounded-md text-lg font-bold px-3 mt-2 justify-between`}>
                                    <div className="flex">
                                        <input className="accent-[#1F7B44]" type="checkbox" id="frontend" defaultChecked={inspection && inspection[0].samplingPoint.includes("Front End")} {...register("option1")} />
                                        <label className="flex ml-2 text-sm justify-center items-center" style={{fontWeight: 500}} htmlFor="option1" >Front End</label>
                                    </div>
                                    <div className="flex">
                                        <input className="accent-[#1F7B44]" type="checkbox" id="backend" defaultChecked={inspection && inspection[0].samplingPoint.includes("Back End")} {...register("option2")} />
                                        <label className="flex ml-2 text-sm justify-center items-center" style={{fontWeight: 500}} htmlFor="option2">Back End</label>
                                    </div>
                                    <div className="flex">
                                        <input className="accent-[#1F7B44]" type="checkbox" id="other" defaultChecked={inspection && inspection[0].samplingPoint.includes("Other")} {...register("option3")} />
                                        <label className="flex ml-2 text-sm justify-center items-center" style={{fontWeight: 500}} htmlFor="option3">Other</label>
                                    </div>
                                </div>
                                <label className="flex mt-5" style={{fontWeight: 500}}>Date/Time of Sampling</label>
                                <div className="flex mt-2">
                                    <DateTimePicker slots={{openPickerIcon: IoCalendarClearOutline}} views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']} format='D/M/YYYY HH:mm:ss' className='flex w-full text-xl'
                                    sx={{ border: '1px solid #A8A8A8', borderRadius: '6px' }} value={samplingDate} onChange={setSamplingDate}/>
                                </div>
                                <div className="flex flex-row h-10 w-full mt-5 pr-5 justify-end mb-10">
                                    <Link to={`/view/${inspectionID}`} className="flex mr-3 cursor-pointer rounded-lg text-[#1F7B44] border-2 border-[#1F7B44] px-5 py-6 text-xl bg-white items-center justify-center">
                                        Cancel
                                    </Link>
                                    <button type="submit" className="flex rounded-lg text-white border-2 border-[#FAFAFA] px-5 py-6 text-xl bg-[#1F7B44] items-center justify-center">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPages;