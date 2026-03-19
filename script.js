const API_BASE = "http://localhost:8000"

const situationInput = document.getElementById("situationInput")
const submitBtn = document.getElementById("submitBtn")
const responseBox = document.getElementById("responseBox")
const modeButtons = document.querySelectorAll(".mode-btn")

let selectModes = "beginner"

modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        modeButtons.forEach((b)=> b.classList.remove("active"))
        btn.classList.add("active")
        selectModes = btn.dataset.mode
    })
})

submitBtn.addEventListener("click", sendSituation)

situationInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey){
        e.preventDefault()
        sendSituation()
    }
})

function buildRequest(situation){
    switch(selectModes){
        case "beginner":
            return {endpoint: "/api/beginner", body:{situation}}
        case "advanced":
            return {endpoint: "/api/advanced", body:{situation}}
        case "trustable":
            return {endpoint: "/api/trustable", body:{situation}}
        default:
            return {endpoint: "/api/beginner", body:{situation}}
    }
}

function sendSituation(){
    const situation = situationInput.value.trim()
    
    if(!situation){
        showError("Você não digitou nehuma situação. Envie apenas após digitar uma")
        return
    }

    setLoading(true)

    try{
        
    } catch (err){
        
    }
    
}