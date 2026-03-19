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
            return {endpoint: "/ai/beginner", body:{situation}}
        case "advanced":
            return {endpoint: "/ai/advanced", body:{situation}}
        case "trustable":
            return {endpoint: "/ai/trustable", body:{situation}}
        default:
            return {endpoint: "/ai/beginner", body:{situation}}
    }
}

async function sendSituation(){
    const situation = situationInput.value.trim()
    
    if(!situation){
        showError("Você não digitou nehuma situação. Envie apenas após digitar uma")
        return
    }

    setLoading(true)

    try{

      const {endpoint, body} = buildRequest(situation)

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      if (!response.ok){
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const data = await response.json()
      const answer = data.answer || data.error || "Sem resposta"
      showResponse(answer)

    } catch (err){
        showError(`Nâo foi possivel se conectar a API. \n${err.message}`)
    } finally {
        setLoading(false)
    }
    
}

function setLoading(isLoading){
    submitBtn.disable = isLoading
    if (isLoading){
        responseBox.innerHTML = '<span class="loading"></span>'
    }
}

function showResponse(text){
    const span = document.createElement("span")
    span.className = "response-text"
    span.textContent = text
    responseBox.innerHTML = ""
    responseBox.appendChild(span)
}

function showError(message){
    const span = document.createElement("span")
    span.className = "response-text"
    span.style.color = "#e25050"
    span.textContent = message
    responseBox.innerHTML = ""
    responseBox.appendChild(span)
}

