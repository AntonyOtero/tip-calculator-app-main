// TODO: allow custom tips ($ value)
// TODO: inputs have to be numbers
// TODO: num of people has to be > 0
// TODO: add a "reset" button functionality
// TODO: add local storage

const bill = document.getElementById('bill')
const tipButtons = document.getElementsByClassName('btn-tip')
const customTip = document.getElementById('custom-tip')
const numOfPeople = document.getElementById('people')

const tipAmount = document.getElementById('tip-amount')
const totalAmount = document.getElementById('total-amount')

const updateValues = () => {
  let tipButton;
  let tipPercent;
  let customTipValue;
  let billValue = Number(bill.value)
  let numOfPeopleValue = Number(numOfPeople.value) > 0 ?
    Number(numOfPeople.value) : 1
  if (document.querySelector('.btn-active')) {
    tipButton = document.querySelector('.btn-active')
    tipPercent = parseFloat(tipButton.textContent) / 100
    tipAmount.textContent = ((billValue * tipPercent) / numOfPeopleValue).toFixed(2)
    totalAmount.textContent = ((billValue * (1 + tipPercent)) / numOfPeopleValue).toFixed(2)
  } else {
    customTipValue = Number(customTip.value)
    tipAmount.textContent = (customTipValue / numOfPeopleValue).toFixed(2)
    totalAmount.textContent = ((billValue + customTipValue) / numOfPeopleValue).toFixed(2)
  }
}

bill.addEventListener("keyup", updateValues)

for (const button of tipButtons) {
  button.addEventListener("mousedown", (e) => {
    if (document.querySelector('.btn-active')) {
      document.querySelector('.btn-active').classList.remove('btn-active')
    }
    e.target.classList.add('btn-active')
    customTip.classList.remove('success')
    customTip.value = ''
    updateValues()
  })
}

customTip.addEventListener("keyup", () => {
  if (customTip.value > 0) {
    document.querySelector('.btn-active').classList.remove('btn-active')
    customTip.classList.add('success')
    updateValues()
  }
})

numOfPeople.addEventListener("keyup", updateValues)