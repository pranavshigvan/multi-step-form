let form = document.querySelector("#main_container")
let page = document.querySelectorAll(".page")
//sidebar elements
let stepNumbers= document.querySelectorAll(".number")
let step1 = document.getElementById("step1")
let step2 = document.getElementById("step2")
let step3 = document.getElementById("step3")
let step4 = document.getElementById("step4")

//personal info inputs
let personalInfo = document.getElementById("personal_info")
let PersonName = document.getElementById("name")
let email = document.getElementById("email")
let phone = document.getElementById("phone")

//select plans
let selectPlan= document.getElementById("plans")
let arcade = document.getElementById("arcade")
let advanced = document.getElementById("advanced")
let pro = document.getElementById("pro")
let subToggle= document.getElementById("toggle")
let monthly = document.getElementById("monthly")
let yearly = document.getElementById("yearly")
let arcadeRate = document.getElementById("arcade_rate")
let advancedRate = document.getElementById("advanced_rate")
let proRate = document.getElementById("pro_rate")
let tooltips = document.querySelectorAll(".tooltip")
//addons
let onlineService = document.getElementById("online_service")
let storage = document.getElementById("storage")
let customizable = document.getElementById("customizable")
let onlineServiceRate = document.getElementById("online_service_rate")
let storageRate = document.getElementById("storage_rate")
let customizationRate = document.getElementById("customization_rate")

//summury
let plan =document.getElementById("plan")
let changeBtn =document.getElementById("change")
let planValue =document.getElementById("plan_value")
let addonName =document.getElementById("addon_name")
let addonPrice =document.getElementById("addon_price")
let totalSum =document.getElementById("total_sum")
let type = document.querySelectorAll(".type")
let subType = document.querySelectorAll(".sub_type")

//buttons
let buttons = document.getElementById("buttons")
let back_btn = document.getElementById("back_btn")
let next_btn = document.getElementById("next_btn")

//thank page
let thanksPage = document.getElementById("thanks_page")

//data
let stepNumber = 1;
let data ={
    personalData:{
        name:"",
        email:"",
        phone:""
    },
    planType:"",
    addOns:[],
    yearlyType: false
}
let plans = {
    monthly:{
        arcade:9,
        advanced:12,
        pro:15
    },
    yearly:{
        arcade:90,
        advanced:120,
        pro:150
    }
}
let addons = {
    monthly:{
        "online service":1,
        "larger storage":2,
        "customizable profile":2
    },
    yearly:{
        "online service":10,
        "larger storage":20,
        "customizable profile":20
    }
}
let total = 0
let createAddonComponent = ()=>{
    let addonSummury = document.getElementById("addons_summury")
    data.addOns.forEach(item=>{
        let selecetedAddon = document.createElement("div")
        selecetedAddon.className ="selected_addon"
        let addonName = document.createElement("p")
        addonName.className = "addon_name"
        addonName.innerText = item
        let heading = document.createElement("h6")
        let addonRate = document.createElement("span")
        addonRate.setAttribute("id","addon_price")
        addonRate.innerText = `+$${addons[data.yearlyType?"yearly":"monthly"][item]}/${data.yearlyType?"yr":"mo"}`        
        heading.appendChild(addonRate)
        selecetedAddon.appendChild(addonName)
        selecetedAddon.appendChild(heading)
        addonSummury.appendChild(selecetedAddon)
        total = total + addons[data.yearlyType?"yearly":"monthly"][item]
    })
}
const populateRate = ()=>{
    arcadeRate.innerText = data.yearlyType?"90/yr":"9/mo"
    advancedRate.innerText = data.yearlyType?"120/yr":"12/mo"
    proRate.innerText = data.yearlyType?"150/yr":"15/mo"
    onlineServiceRate.innerText = data.yearlyType?"10/yr":"1/mo"
    storageRate.innerText = data.yearlyType?"20/yr":"2/mo"
    customizationRate.innerText = data.yearlyType?"20/yr":"2/mo"
}
populateRate()
subToggle.onclick = (e)=>{
    data.yearlyType=!data.yearlyType
    yearly.classList.toggle("highlight")
    monthly.classList.toggle("highlight")
    tooltips.forEach(item=>{
        item.classList.toggle("show")
    })
    populateRate()
}
const populateSummury = ()=>{
    total = 0
    plan.innerText = data.planType
    planValue.innerText = plans[data.yearlyType?"yearly":"monthly"][data.planType]
    total = total+plans[data.yearlyType?"yearly":"monthly"][data.planType]
    type.forEach(item=>{
        item.innerText = data.yearlyType?"year":"month"
    })
    document.getElementById("addons_summury").innerHTML = ""
    createAddonComponent()
    subType.forEach(item=>{
        item.innerText = data.yearlyType?"yr":"mo"
    })
    totalSum.innerText = total
}
const updatePage = ()=>{
    page.forEach(item=>{
        item.style.display = "none"
    })
    page[stepNumber-1].style.display = "block"
}
const updateStepNumber = ()=>{
    stepNumbers.forEach(item=>{
        item.classList.remove("active")
    })
    stepNumbers[stepNumber-1].classList.add("active")
}
next_btn.onclick = (e)=>{
    e.preventDefault()
    stepNumber+=1
    switch (stepNumber) {
        case 2:
            if (PersonName.value && email.value && phone.value) {
                data.personalData.name = PersonName.value
                data.personalData.email = email.value
                data.personalData.phone = phone.value
                back_btn.style.visibility = "visible"
                updatePage()
                updateStepNumber()
            }else{
                stepNumber-=1
            } 
            break;
        case 3:
            if(document.querySelector("input[name='plans']:checked") !== null){
                data.planType = document.querySelector("input[name='plans']:checked").value
                updatePage()
                updateStepNumber()
            }else{
                stepNumber-=1
            }
            break;
        case 4:
            if (document.querySelectorAll("input[name='addon']:checked").length>0) {
                next_btn.className = "confirm"
                next_btn.innerText = "Confirm"
                data.addOns = []
                document.querySelectorAll("input[name='addon']:checked").forEach(item=>{  
                    data.addOns.push(item.value)
                })
                back_btn.style.visibility = "visible"
                updatePage()
                updateStepNumber()
                populateSummury()
            }else{
                stepNumber-=1
            }
            console.log(data)
            break;
        case 5:
            form.style.display = "none"
            thanksPage.style.display = "grid"
            break;
        default:
            break;
    }
}

back_btn.onclick = (e)=>{
    e.preventDefault()
    stepNumber-=1
    switch (stepNumber) {
        case 1:
            back_btn.style.visibility = "hidden"
            updatePage()
            break;
        case 2:
            updatePage()
            break;
        case 3:
            next_btn.className = "next"
            next_btn.innerText = "Next"
            updatePage()
            break;
        default:
            break;
    }
}