Object.prototype.isEmpty = function () {
    return Object.keys(this).length == 0;
}

let gridObj = {
    radio: true,
    responses: {},
    qtext: {
        "Q1": "What is your favorite integer",
        "00": "this is a test",
        "Q2": "Pick a value",
        "Q3": "Pick another value",
        "Q4": "I hope you guessed, pick a third value"
    },
    values: {
        "0": "x_001",
        "1 to 2": 'x_002',
        "3 to 4": 'x_003',
        "5 to 6": 'x_004',
        "7 to 10": 'x_005',
        "11 to 20": 'x_006',
        "21 or more": 'x_007'
    },
    inputElements: {}
}


function renderGridSmall(obj, parentDiv) {
    console.log("I\'m small!!!")
    parentDiv.innerText = ""
    // for each key in the qtext, create a question div..
    Object.entries(obj.qtext).forEach(([qId, qText]) => {
        console.log(`key >${qId}< value>${qText}<`)
        let qDiv = document.createElement("div")
        qDiv.id = qId
        let textDiv = document.createElement("div")
        textDiv.innerText = qText
        qDiv.appendChild(textDiv)
        Object.entries(obj.responses[qId]).forEach(([response, responseElements]) => {
            qDiv.appendChild(responseElements.responseDiv)
            qDiv.appendChild(responseElements.labelElement)
        })
        parentDiv.appendChild(qDiv)
    })
}
function renderGridLarge(obj, parentDiv) {
    console.log("I\'m large!!!")
    parentDiv.innerText = ""
    let gridDiv = document.createElement("div")
    gridDiv.classList.add("grid_wrapper")

    // add the response row...
    Object.entries(obj.values).forEach(([response, responseValue], index) => {
        console.log(`rr: ${response}, ${responseValue} ${index}`)
        if (index == 0) {
            let div = document.createElement("div")
            div.classList.add("gridcell", "questioncell")
            gridDiv.insertAdjacentElement("beforeend", div)
        }
        let div = document.createElement("div")
        div.classList.add("gridcell")
        div.insertAdjacentText("beforeend", response)
        gridDiv.insertAdjacentElement("beforeend", div)
    })

    // for each key in the qtext, create a question div..
    Object.entries(obj.qtext).forEach(([qId, qText]) => {
        console.log(`key >${qId}< value>${qText}<`)
        let qDiv = document.createElement("div")
        qDiv.id = qId
        qDiv.classList.add("gridcell", "questioncell")
        qDiv.insertAdjacentText("beforeend", qText)
        gridDiv.insertAdjacentElement("beforeend", qDiv)
        Object.entries(obj.responses[qId]).forEach(([response, responseElements]) => {
            let div = document.createElement("div")
            div.classList.add("gridcell")
            div.insertAdjacentElement("beforeend", responseElements.responseDiv)
            gridDiv.insertAdjacentElement("beforeend", div)

        })
        /*         Object.entries(obj.values).forEach(([response, responseValue], index) => {
                    let div = document.createElement("div")
                    div.classList.add("gridcell")
        
                    let inputElement = document.createElement("input")
                    inputElement.type = (gridObj.radio) ? "radio" : "checkbox"
                    inputElement.value = responseValue;
                    inputElement.id = `${qId}_${index}`
                    inputElement.name = `${qId}_name`
                    div.insertAdjacentElement("beforeend", inputElement)
        
                    gridDiv.insertAdjacentElement("beforeend", div)
                }) */
    })
    parentDiv.insertAdjacentElement("beforeend", gridDiv)
}

function renderGrid(obj, parentDiv) {
    console.log(parentDiv, currentMediaState)
    // make the responsess only if needed...
    if (obj.responses.isEmpty()) {
        Object.entries(obj.qtext).forEach(([qId, qText]) => {
            obj.responses[qId] = {}
            Object.entries(obj.values).forEach(([response, responseValue], index) => {
                let responseDiv = document.createElement("input")
                responseDiv.type = "radio"
                responseDiv.value = responseValue
                responseDiv.id = `${qId}_${index}`
                responseDiv.name = `${qId}_name`
                let responseLabel = document.createElement("label")
                responseLabel.setAttribute("for", `${qId}_${index}`)
                responseLabel.innerText = response
                obj.responses[qId][responseValue] = {}
                obj.responses[qId][responseValue].responseDiv = responseDiv
                obj.responses[qId][responseValue].labelElement = responseLabel
            })
        })
    }
    console.log(obj.responses)
    renderFunction = (currentMediaState == "small") ? renderGridSmall : renderGridLarge
    renderFunction(obj, parentDiv)
}


function renderAllGrids() {
    let mediaState = getMediaState();
    if (mediaState != currentMediaState) {
        currentMediaState = mediaState
        renderGrid(gridObj, gridParent)
    }
}
function getMediaState() {
    let maxWidth = 700
    return window.matchMedia(`(max-width: ${maxWidth}px)`).matches ? "small" : "big"
    //return (window.innerWidth <= 700) ? "small" : "big"
}



function reportWindowSize() {
    windowHeight.textContent = window.innerHeight;
    windowWidth.textContent = window.innerWidth;
    windowState.textContent = currentMediaState;
    renderAllGrids()
}
function windowLoaded() {
    reportWindowSize()
    renderGrid(gridObj, document.getElementById("gridParent"))
}

let currentMediaState = getMediaState();
window.addEventListener('resize', reportWindowSize);
window.addEventListener('load', windowLoaded)