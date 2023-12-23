    let maxValue = 100;
    let minValue = 0;
    let minimumStep = 5; //minumumStep shoud be > 0;

    
    
    var process = false;
    var currentDiv = "";
    var boundingClientRect = "";
    var rightRangePosition = "";
    var leftRangePosition = "";
    var leftRangeProcess = false;
    var rightRangeProcess = false;
    var rightPosition = null;
    var leftPosition = null;
    var mousePositin = null;
    var currentStepLeft = null;
    var currentStepRight = null;

    
var htmlContent = (        
`<div class='range_container' id="rangerPrnt">
<div class='offsetDiv'>
        <div class='leftRange' id="Leftranger">
            <div class='PointerLeft' onpointerdown="rangeSelector(event)">
            </div>
        </div>
        <div class='RightRange' id="Rigntranger" >
            <div class='PointerRight' onpointerdown="rangeSelector(event)">
            </div>
        </div>

    <div class='range_capacity'>
        <div class='rangeLowestValue'>${minValue}</div>
        <div class='rangeHighestValue'>${maxValue}</div>
    </div>

</div>
</div>`
);

window.onload = () => {
    const setRangeData = document.getElementById("range_holder")
    setRangeData.innerHTML = htmlContent;
    const leftRange = document.querySelector(".leftRange");
    const RightRange = document.querySelector(".RightRange");
    const leftWidth = leftRange.firstElementChild.offsetWidth;
    const RightWidth = RightRange.firstElementChild.offsetWidth;
    leftRange.style.width = `${leftWidth}px`;
    RightRange.style.width = `${RightWidth}px`;
}



const setClietRect = (e) => {
    const rangeCurrentMax_val = document.querySelector(".rangeHighestValue");
    const rangeCurrentMin_val = document.querySelector(".rangeLowestValue");
    
    if(process === true){
        let clientXposition = e.clientX;
        let currentPositionInDiv = Math.ceil(clientXposition - boundingClientRect.left);
        let divWidth = boundingClientRect.width;
        let rangeSelectorWidth = currentDiv.children[0].offsetWidth;
        let leftSpecificPosition = Number(leftRangePosition.offsetWidth);
        let rightSpecificPosition = Number( divWidth - rightRangePosition.offsetWidth );
        rightPosition = (divWidth - currentPositionInDiv);
        leftPosition = (currentPositionInDiv + rangeSelectorWidth);
        let twoRengSelectorWidth = (rangeSelectorWidth + rangeSelectorWidth);
        let rangeInnerValue = (divWidth - twoRengSelectorWidth);
        const maxInnerValue = (divWidth - rangeSelectorWidth);
        const betWeenValue = (maxValue - minValue);
        let stepCount =  ( betWeenValue / minimumStep);
        let rangeSteper = (rangeInnerValue / betWeenValue);//0.936
        let minStepCount = (rangeInnerValue / stepCount);//9.36
    
    if(currentStepLeft === null && currentStepRight === null){
        currentStepLeft = minValue;
        currentStepRight = maxValue;
    }
    let processStoping = (currentStepRight - currentStepLeft);
    
    function leftRangCalculation(selector){
        let trey;
        if(leftPosition <= rangeSelectorWidth){
            leftPosition = rangeSelectorWidth;
        }else if(leftPosition >= rightSpecificPosition){
            leftPosition = rightSpecificPosition;
        }else if(leftPosition >= maxInnerValue){
            leftPosition = maxInnerValue;
        }    
        if(selector === "left" && leftSpecificPosition < leftPosition){
            trey = Math.floor((leftSpecificPosition - rangeSelectorWidth) / rangeSteper); 
        }else{
            trey = Math.floor((leftPosition - rangeSelectorWidth) / rangeSteper);
        }

        let prgress = Math.round(trey / minimumStep); 

        let currentStep = (prgress * minimumStep);
        currentStepLeft = (minValue + currentStep); 
        rangeCurrentMin_val.innerHTML = (minValue + currentStep);                     
        let currentStyleWidth = Math.round((prgress * minStepCount) + rangeSelectorWidth);
        currentDiv.style.width = `${currentStyleWidth}px`;
    }
    
    function rightRangCalculation(selector){
        let trey;
         if(leftPosition <= rangeSelectorWidth){
            leftPosition = rangeSelectorWidth;
        }else if(leftPosition <= leftSpecificPosition){
            leftPosition = leftSpecificPosition;
        }else if(leftPosition >= maxInnerValue){
            leftPosition = maxInnerValue;
        }
        if(selector === "right" && rightSpecificPosition >  leftPosition){
            trey = Math.floor((rightSpecificPosition  - rangeSelectorWidth) / rangeSteper);
        }else{
            trey = Math.floor((leftPosition  - rangeSelectorWidth) / rangeSteper); 
        }
        let prgress = Math.round(trey / minimumStep); 

        let currentStep = (prgress * minimumStep);
        let currentStyleWidth = Math.ceil((prgress * minStepCount) + rangeSelectorWidth);                     
        let rightCurrentWidth = Math.round((divWidth - currentStyleWidth));
        currentStepRight = (minValue + currentStep);
        rangeCurrentMax_val.innerHTML = (minValue + currentStep);           
        currentDiv.style.width = `${rightCurrentWidth}px`;
    }
            
    
    if(leftRangeProcess === true){ 
            if(mousePositin > currentPositionInDiv){
                if(leftPosition >= rangeSelectorWidth){
                    leftRangCalculation("left")
                }
            }else if(mousePositin < currentPositionInDiv){     
            if(
                processStoping <= minimumStep
            ){
                leftPosition = leftSpecificPosition;
            }
            if(leftPosition <= maxInnerValue){
                leftRangCalculation("right")
            }
        }
        }else if(rightRangeProcess === true){
                if(mousePositin > currentPositionInDiv){
                    if(
                        processStoping <= minimumStep
                    ){
                        leftPosition = rightSpecificPosition;
                    }
                    if(leftPosition >= rangeSelectorWidth){
                        rightRangCalculation("left")
                    }        
                }else if(mousePositin < currentPositionInDiv){
                    if(leftPosition <= maxInnerValue){
                        rightRangCalculation("right")
                    }                   
                }
            }  
            mousePositin = currentPositionInDiv;
        }
    
}
const rangeControler = (e) => {
    boundingClientRect = e.currentTarget.getBoundingClientRect();
    setClietRect(e)
}

const rangerPrntPositin = (e) => {
    setClietRect(e)
}

const rangeSelector = (e) => {
    currentDiv = e.currentTarget.offsetParent;
    const rangeParent = document.querySelector(".offsetDiv");
    if(rangeParent.children[0].firstElementChild === e.currentTarget){
        leftRangeProcess = true;
        leftRangePosition = rangeParent.children[0];
        rightRangePosition = rangeParent.children[1];
    }else if(rangeParent.children[1].firstElementChild === e.currentTarget){
        rightRangeProcess = true;
        leftRangePosition = rangeParent.children[0];
        rightRangePosition = rangeParent.children[1];
    }
    const rangeContainer = document.querySelector(".range_pr");
    rangeParent.addEventListener("pointermove",rangeControler)
    rangeContainer.addEventListener("pointermove",rangerPrntPositin)
    process = true;
    window.addEventListener("pointerup",rangeUnselect)
}

const rangeUnselect = (e) => {
    const rangeParent = document.querySelector(".offsetDiv");
    rangeParent.removeEventListener("pointermove",rangeControler)
    const rangeContainer = document.querySelector(".range_pr");
    rangeContainer.removeEventListener("pointermove",rangerPrntPositin)
    process = false;
    currentDiv.style.zIndex = 0;     
    leftRangeProcess = false;
    rightRangeProcess = false;
}

