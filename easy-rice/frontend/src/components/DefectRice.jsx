import React from "react";


function DefectRice({name,actual,isData}) {
    return(
        <div className={`flex text-sm ${isData ? 'border-b border-[#A8A8A8] pb-2' : ''} p-2`}>
            <div className="flex w-5/6" style={{fontWeight: 500}}>
                {name}                    
            </div>
            <div className="flex w-1/6 text-[#1F7B44]" style={{fontWeight: 500}}>
                {(actual*100).toFixed(2)}%                       
            </div>
        </div>
    );
}

export default DefectRice;