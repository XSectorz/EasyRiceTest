import React from "react";

function Composition({name, condition, actual}) {
/*
    let minCondition;
    let maxCondition;

    if(conditionMin === "GT") {
        minCondition = String(Number(minLength));
    } else if(conditionMin === "GE") {
        minCondition =  minLength;
    }

    if(conditionMax === "LT") {
        maxCondition = String(Number(maxLength)-0.01);
    } else if(conditionMax === "LE") {
        maxCondition = maxLength;
    }

    let maxWeight = 0;
    let currentWeight = 0;

    for(let grain in data) {
        const length = Number(data[grain].length);
        const weight = Number(data[grain].weight);
        if(length >= Number(minCondition) && length <= Number(maxCondition)) {
            currentWeight = currentWeight + weight;
        }

        maxWeight = maxWeight + weight;
    }
    let strLength = "";
    if(maxLength === 99) {
        strLength = ">= " + String(minCondition);
    } else {
        strLength = String(minCondition) + " - " + String(maxCondition);
    }*/

    return (
        <div className="flex text-sm border-b border-[#A8A8A8] pb-2 p-2">
            <div className="flex w-4/6" style={{fontWeight: 500}}>
                {name}                    
            </div>
            <div className="flex w-1/6 text-[#707070]" style={{fontWeight: 500}}>
                {condition}
            </div>
            <div className="flex w-1/6 text-[#1F7B44]" style={{fontWeight: 500}}>
                {(actual*100).toFixed(2)}%                       
            </div>
        </div>
    );
}

export default Composition;