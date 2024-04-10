import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Composition from "../components/Composition";
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ViewResults() {

    const [ inspectionData, setInspectionData ] = useState(null);
    const [ grainsData , setGrainsData ] = useState(null);
    const [ standardData , setStandardData ] = useState([]);

    const { inspectionID } = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
         try {
             const response = await axios.get("http://localhost:5000/api/easy-rice/history/" + inspectionID);
             const responseGrains = await axios.get("http://localhost:5000/api/easy-rice/grains/e562a660-47b6-4d90-93fe-1d10dc165bba");

             setInspectionData(response.data);
             setGrainsData(responseGrains.data);
             //console.log(responseGrains.data);
         } catch (err) {
             if(err.response.status === 404) {
                navigate("/");
                return;
             }
         }
     };

    const addStandardDataState = (min,max,label,conditionStr) => {
        setStandardData(prevState => [...prevState, { minCondition: min, maxCondition: max, name: label, conditionStr: conditionStr }]);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    },[]);

    let dateTime;
    let samplingTime;
    let dateStr;
    let samplingStr;
    let samplingStrTH;
    let dataWeight;

    const monthTH = ["ม.ค", "ก.พ", "มี.ค", "เม.ย", "พ.ค", "มิ.ย" , "ก.ค", "ส.ค" , "ก.ย", "ต.ค" , "พ.ย", "ธ.ค"];

    if(inspectionData) {
        dateTime = new Date(inspectionData[0].createDate);
        samplingTime = new Date(inspectionData[0].samplingDate);
        dateStr = dateTime.getDate().toString().padStart(2, '0') + "/" + (dateTime.getMonth() + 1).toString().padStart(2, '0') + "/" + dateTime.getFullYear() + " - " + dateTime.getHours().toString().padStart(2, '0') + ":" + dateTime.getMinutes().toString().padStart(2, '0') + ":" + dateTime.getSeconds().toString().padStart(2, '0');    
        samplingStr =  samplingTime.getDate().toString().padStart(2, '0') + "/" + (samplingTime.getMonth() + 1).toString().padStart(2, '0') + "/" + samplingTime.getFullYear() + " - " + samplingTime.getHours().toString().padStart(2, '0') + ":" + samplingTime.getMinutes().toString().padStart(2, '0') + ":" + samplingTime.getSeconds().toString().padStart(2, '0');    
        samplingStrTH =  samplingTime.getDate().toString().padStart(2, '0') + " " + monthTH[samplingTime.getMonth()-1] + " " + samplingTime.getFullYear() + " - " + samplingTime.getHours().toString().padStart(2, '0') + ":" + samplingTime.getMinutes().toString().padStart(2, '0') + ":" + samplingTime.getSeconds().toString().padStart(2, '0');    
        
    }

    if(grainsData && inspectionData && standardData.length === 0) {
        for(let standard in inspectionData[0].standardData) {
            //console.log(standard);
            const dataStandard = inspectionData[0].standardData[standard];
            const condtionMinLabel = dataStandard.conditionMin;
            const condtionMaxLabel = dataStandard.conditionMax;
            const standardLabel = dataStandard.name;
            const minLength = dataStandard.minLength;
            const maxLength = dataStandard.maxLength;
            let minCondition;
            let maxCondition;
        
            if(condtionMinLabel === "GT") {
                minCondition = String(Number(minLength));
            } else if(condtionMinLabel === "GE") {
                minCondition =  minLength;
            }
        
            if(condtionMaxLabel === "LT") {
                maxCondition = String(Number(maxLength)-0.01);
            } else if(condtionMaxLabel === "LE") {
                maxCondition = maxLength;
            }

            let conditionStr = "";
            if(maxLength === 99) {
                conditionStr = ">= " + String(minCondition);
            } else {
                conditionStr = String(minCondition) + " - " + String(maxCondition);
            }

          //  console.log("STR: ",conditionStr);
            addStandardDataState(minCondition,maxCondition,standardLabel,conditionStr);
        }

    }
    let maxWeight = 0;
    if(standardData && standardData.length > 0) {
        dataWeight = new Array(inspectionData[0].standardData.length).fill(0);
        //console.log("Length" ,dataWeight.length);
        for(let grainIndex in grainsData[0].grains) {
            const grain = grainsData[0].grains[grainIndex];
            const length = Number(grain.length);
            const weight = Number(grain.weight);
            maxWeight = maxWeight + weight;
           // console.log("Standard Length ",standardData.length);

            for(let standardIndex in standardData) {
                const standard = standardData[standardIndex];
                if(length >= Number(standard.minCondition) && length <= Number(standard.maxCondition)) {
                    dataWeight[standardIndex] = Number(dataWeight[standardIndex]) + weight;
                }
            }
        }

       /* console.log("Data Weight 0:",(dataWeight[0]/maxWeight));
        console.log("Data Weight 1:",(dataWeight[1]/maxWeight));
        console.log("Data Weight 2:",(dataWeight[2]/maxWeight));*/
    }
    
    return(
        <div className=" bg-[#FAFAFA] h-full">
            <div className='flex flex-col w-full'>
                <div className="flex">
                    <NavBar/>
                </div>
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <div className="flex text-[40px] mt-5" style={{fontWeight: 500}}>
                        Inspection
                    </div>
                    <div className="flex flex-row w-full h-full mt-10 px-24">
                        <div className="flex w-2/5 h-full flex-col">
                            <div className="flex w-full h-full justify-end pr-5">
                               <div className="flex w-3/5 h-3/5 ">
                                    <img src={grainsData ? grainsData[0].imageURL : ""}/>
                                </div>
                            </div>
                            <div className="flex flex-row h-10 w-full mt-5 pr-5 justify-end">
                                <Link to="/" className="flex mr-3 cursor-pointer rounded-md text-[#1F7B44] border-2 border-[#1F7B44] px-5 py-4 text-xl bg-white items-center justify-center">
                                    Back
                                </Link>
                                <Link to="/" className="flex cursor-pointer rounded-md text-white border-2 border-[#FAFAFA] px-6 py-4 text-xl bg-[#1F7B44] items-center justify-center">
                                    Edit
                                </Link>
                            </div>
                        </div>
                        <div className="flex w-3/5 h-full bg-[#707070] bg-opacity-10 p-5">
                            <div className="flex h-full w-full flex-col">
                                <div className="flex bg-white rounded-md flex-col h-full w-full p-5">
                                    <div className="flex flex-row h-full w-full">
                                        <div className="flex text-[#707070] w-1/2">
                                            Create Date - Time
                                        </div>
                                        <div className="flex text-[#707070] w-1/2">
                                            Inspection ID:
                                        </div>
                                    </div>
                                    <div className="flex flex-row h-full w-full">
                                        <div className="flex w-1/2">
                                            {dateTime ? dateStr : ""}
                                        </div>
                                        <div className="flex w-1/2">
                                            {inspectionData ? inspectionData[0].inspectionID : ""}
                                        </div>
                                    </div>
                                    <div className="flex flex-row h-full w-full mt-2">
                                        <div className="flex text-[#707070] w-1/2">
                                            Standard:
                                        </div>
                                        <div className="flex text-[#707070] w-1/2">
                                            Total Sample:
                                        </div>
                                    </div>
                                    <div className="flex flex-row h-full w-full">
                                        <div className="flex w-1/2">
                                            {inspectionData ? inspectionData[0].standardName : ""}
                                        </div>
                                        <div className="flex w-1/2">
                                            {grainsData ? grainsData[0].grains.length : "0"} Kernel
                                        </div>
                                    </div>
                                    <div className="flex flex-row h-full w-full mt-2">
                                        <div className="flex text-[#707070] w-1/2">
                                            Update - Date Time:
                                        </div>
                                    </div>
                                    <div className="flex flex-row h-full w-full">
                                        <div className="flex w-1/2">
                                            {inspectionData ? samplingStr : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex bg-white rounded-md flex-col h-full w-full p-5 mt-5">
                                    <div className="flex flex-row h-full w-full">
                                        <div className="flex text-[#707070] w-1/2">
                                            Note
                                        </div>
                                        <div className="flex text-[#707070] w-1/2">
                                            Price
                                        </div>
                                    </div>
                                    <div className="flex flex-row h-full w-full">
                                        <div className="flex w-1/2">
                                            {inspectionData ? inspectionData[0].note : ""}
                                        </div>
                                        <div className="flex w-1/2">
                                            {inspectionData ? inspectionData[0].price.toLocaleString() : ""}
                                        </div>
                                    </div>
                                    <div className="flex flex-row h-full w-full mt-2">
                                        <div className="flex text-[#707070] w-1/2">
                                            Date/Time of Sampling
                                        </div>
                                        <div className="flex text-[#707070] w-1/2">
                                            Sampling Point
                                        </div>
                                    </div>
                                    <div className="flex flex-row h-full w-full">
                                        <div className="flex w-1/2">
                                            {inspectionData ? samplingStrTH : ""}
                                        </div>
                                        <div className="flex w-1/2">
                                            {inspectionData ? inspectionData[0].samplingPoint.join(", ") : ""}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex bg-white rounded-md flex-col h-full w-full p-5 mt-5">
                                    <div className="flex text-xl" style={{fontWeight: 500}}>
                                        Composition
                                    </div>
                                    <div className="flex flex-col w-full h-full bg-[#707070] bg-opacity-10 p-2 mt-2 justify-between">
                                        <div className="flex w-full h-full">
                                            <div className="flex w-4/6" style={{fontWeight: 500}}>
                                                Name
                                            </div>
                                            <div className="flex w-1/6" style={{fontWeight: 500}}>
                                                Length
                                            </div>
                                            <div className="flex w-1/6" style={{fontWeight: 500}}>
                                                Actual
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full h-full mt-2">
                                    {standardData.map((item, index) => (
                                        <Composition name={item.name} condition={item.conditionStr} actual={(dataWeight[index]/maxWeight)}/>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewResults;