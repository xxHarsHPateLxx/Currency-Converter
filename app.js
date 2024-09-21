const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateExchangeRate = async () => {
    let amt = document.querySelector(".amount input")
    let amtValue = amt.value
    if(amtValue == "" || amtValue < 1) {
        amtValue = 1
        amt.value = "1"
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`

    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]    
    
    let finalAmt = amtValue * rate
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
}

const updateFlag = (elem) => {   
    let currCode = elem.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = elem.parentElement.querySelector("img")
    img.src = newSrc
}



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", updateExchangeRate)




// before
// json = fetchJSON(`/currencies/{fromCurrency}/{toCurrency}`)
// rate = json[toCurrency]


// after
// json = fetchJSON(`/currencies/{fromCurrency}`)
// rate = json[fromCurrency][toCurrency]