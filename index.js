// TODO: Add icons to inputs
// TODO: add local storage

const bill = document.getElementById('bill')
const tipButtons = document.getElementsByClassName('btn-tip')
const customTip = document.getElementById('custom-tip')
const numOfPeople = document.getElementById('people')
const resetButton = document.querySelector('.reset')

const billMessage = document.getElementById('billMessage')
const peopleMessage = document.getElementById('peopleMessage')

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
  resetButton.classList.remove('btn-disabled')
  resetButton.disabled = false;
}

const getValidity = (input) => {
  const validitity = {isValid: false, message: ''}
  if (isNaN(Number(input.value))) {
    validitity.isValid = false
    validitity.message = 'Please enter a number'
  } else if (Number(input.value) <= 0) {
    validitity.isValid = false
    validitity.message = `Can't be zero`
  } else {
    validitity.isValid = true
    validitity.message = ''
  }

  return validitity
}

const handleInput = (input, message) => {
  const validity = getValidity(input)
  if (validity.isValid) {
    input.classList.remove('error')
    message.style.visibility = 'hidden'
    updateValues()
  } else {
    input.classList.add('error')
    message.textContent = validity.message
    message.style.visibility = 'visible'
  }
}

bill.addEventListener("keyup", () => {
  handleInput(bill, billMessage)
})

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
  if (customTip.value >= 0) {
    document.querySelector('.btn-active').classList.remove('btn-active')
    customTip.classList.add('success')
  }
    updateValues()
})

numOfPeople.addEventListener("keyup", () => {
  handleInput(numOfPeople, peopleMessage)
})

resetButton.addEventListener("click", () => {
  bill.value = ''
  numOfPeople.value = ''
  customTip.value = ''
  tipAmount.textContent = '0.00'
  totalAmount.textContent = '0.00'
  if (document.querySelector('.btn-active')) {
    document.querySelector('.btn-active').classList.remove('btn-active')
  }
  bill.classList.remove('error')
  billMessage.style.visibility = 'hidden'
  numOfPeople.classList.remove('error')
  peopleMessage.style.visibility = 'hidden'
  resetButton.classList.add('btn-disabled')
  resetButton.disabled = true
})