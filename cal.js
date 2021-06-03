function changeColor(variable){
	var myCheckedOne = document.getElementById('one').checked,
		myCheckedTwo = document.getElementById('two').checked,
		mySelect =  document.getElementById('select'),
		myBody = document.getElementsByTagName("BODY")[0];
	
	if(variable == 'one'){
		myBody.style.background = '#394666';
		mySelect.style.background = '#181f32'
		
	}else if(variable == 'two'){
		myBody.style.background = '#333';
		mySelect.style.background = '#fff'
	}else{
		myBody.style.background = '#e00a';
		mySelect.style.background = '#00ea'
	}
}

/**/

class Calculator{
	constructor(previousElement, currentElement, resElement){
		this.previousElement = previousElement
		this.currentElement = currentElement
		this.resElement = resElement
		this.clear()

	}
	clear(){
		this.res = ''
		this.current = ''
		this.previous = ''
		this.operation = undefined
	}
	delete() {
		this.current = this.current.toString().slice(0, -1)
	}
	append(number){
		if(this.current > 10000000000)return
		if (number === '.' && this.current.includes('.'))return
		this.current = this.current.toString() + number.toString()
		console.log(this.current)
		
	}
	chooseop(operation){
		if(this.current === '' && this.resElement.innerText != ''){
			this.operation = operation
			this.previous = this.res
		}else{
		if(this.current === '')return
		if(this.previous !== ''){
			this.compute2()
		}
		this.operation = operation
		this.previous = this.current
		this.current = ''
		}
	}
	compute(){
		let computation
		const prev = parseFloat(this.previous)
		const curr = parseFloat(this.current)
		if(isNaN(prev) || isNaN(curr))return
		switch (this.operation){
			case '+':
			computation = prev + curr
			break
			case '-':
			computation = prev - curr
			break
			case '×':
			computation = prev * curr
			break
			case '/':
			computation = prev / curr
			break
			default:
			return
		}
		this.current = ''
		this.res = computation
		this.operation = undefined
		this.previous = ''
		if(this.res > 10000000000){this.resElement.innerText = undefined 
		this.res = 0}else{
		this.resElement.innerText = this.getNumber(this.res)}
		if(this.resElement != null){
			this.previousElement.innerText =  ''
			this.currentElement.innerText =  ''
		}
	}
	compute2(){
		let computation
		const prev = parseFloat(this.previous)
		const curr = parseFloat(this.current)
		if(isNaN(prev) || isNaN(curr))return
		switch (this.operation){
			case '+':
			computation = prev + curr
			break
			case '-':
			computation = prev - curr
			break
			case '×':
			computation = prev * curr
			break
			case '/':
			computation = prev / curr
			break
			default:
			return
		}
		this.current = computation
		this.operation = undefined
		this.previous = ''
	}
	getNumber(number){
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if(isNaN(integerDigits)){
			integerDisplay = ''
		}else {
		integerDisplay = integerDigits.toLocaleString('en', {
			maximumFractionDigits:0
		})
		}
		if(decimalDigits != null){
			return `${integerDisplay}.${decimalDigits}`
		}else{
			return integerDisplay
		}
		
	}
	update(){
		if(this.operation != null){
		this.previousElement.innerText = `${this.operation} ${this.getNumber(this.previous)}`
		}else{
			this.previousElement.innerText = ''
		}
		console.log()
		if(this.resElement != ''){
			this.resElement.innerText =  ''
		}
		this.currentElement.innerText = this.getNumber(this.current)
	}

}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const delButton = document.querySelector('[data-del]')
const resetButton = document.querySelector('[data-reset]')
const previousElement = document.querySelector('[data-previous]')
const currentElement = document.querySelector('[data-current]')
const resElement = document.querySelector('[data-res]')

const calculator = new Calculator(previousElement, currentElement, resElement)

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.append(button.innerText)
		calculator.update()
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseop(button.innerText)
		calculator.update()
	})
})

equalButton.addEventListener('click', button => {
	calculator.update()
	calculator.compute()
})
resetButton.addEventListener('click', button => {
	calculator.clear()
	calculator.update()
})
delButton.addEventListener('click', button => {
	calculator.delete()
	calculator.update()
})

currentElement.innerText = 'Type'