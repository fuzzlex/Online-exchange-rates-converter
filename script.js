const selectRates = document.querySelectorAll(".input-select-value");
const amountValue = document.getElementById("selected-value");
const resultText = document.getElementById("result-text");
const submitBtn = document.getElementById("submit-button");
const dateTime = document.getElementById("date-time");
const displayRate = document.getElementById("display")
let fromValueRate;
let toValueRate;
let k = "";


// window.onload = () =>{
//     amountValue.focus();
// }


const getCurrencyApi = async () => {
    const response = await axios({
        url: "https://v6.exchangerate-api.com/v6/2faf54e4b9b5b952ee161cf8/latest/USD"
    });
    const {
        time_last_update_utc,
        conversion_rates
    } = response.data;

    const ratesArray = Object.keys(conversion_rates);
    selectRates.forEach(f => {
        ratesArray.forEach(e => {
            f.innerHTML += `<option value="${e}">${e}</option>`
        });
    });
    selectRates.forEach((e, index) => {
        e.addEventListener("change", (a) => {
            if (index == 0) {
                fromValueRate = a.target.value;
            } else {
                toValueRate = a.target.value;
            }
        })
    })

    submitBtn.addEventListener("click", () => {
        const compareRateUnit = conversion_rates[toValueRate] / conversion_rates[fromValueRate];
        const result = (compareRateUnit * amountValue.value).toFixed(3);

        if (amountValue.value == "" || toValueRate == "" || fromValueRate == "") {
            alert("You should enter the values!!!")
        } else {
            resultText.innerText = `${amountValue.value} ${fromValueRate} = ${result} ${toValueRate}`
        }
    })
    const onlinerateTr = () => {
        time_last_update_utc.split(" ").slice(0, 4).map(e => {
            k += ` ${e}`;
        });
        dateTime.innerText = k;
        displayRate.innerHTML = `<ul class="ul-list">
        <li><i class="fas fa-euro-sign"></i>${(conversion_rates.TRY / conversion_rates.EUR).toFixed(3)}</li>
        <li><i class="fas fa-dollar-sign"></i>${conversion_rates.TRY}</li>
        <li><i class="fas fa-pound-sign"></i>${(conversion_rates.TRY / conversion_rates.GBP).toFixed(3)}</li>
        </ul>`
    }


    onlinerateTr()
}
getCurrencyApi()