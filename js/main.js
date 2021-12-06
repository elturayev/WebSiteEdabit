
let select = document.querySelector('select')
let check = document.querySelector('.check')
let textarea = document.querySelector('textarea')
let left = document.querySelector('.left')
let tester = document.querySelector('.tester')
let val = ''

function createElements(...array){
	return array.map((el)=>{
		return document.createElement(el)
	})
}

for (let i of tasks){
	let [option] = createElements("option")
	option.value = i.taskNumber
	option.textContent = i.taskNumber + " - masala"
	select.append(option)
}



select.addEventListener('change',()=>{
	left.innerHTML = null
	tester.innerHTML = null
	textarea.value = ''
	if (select.value == "0") return;
	val = tasks[(+select.value) - 1]
	let [p,img] = createElements("p","img")
	p.textContent = (tasks[(+select.value) - 1]).textTask
	img.src = `./img/${(tasks[(+select.value) - 1]).img}`
	left.append(p,img)
	
})

check.onclick = ()=>{
	tester.innerHTML = null
	if (select.value == "0") return;
	let code = ` ${textarea.value}`
	let scopL = 0
	let scopR = 0
	let bracketsL = 0
	let bracketsR = 0
	for (let i of code){
		if (i == "{") scopL +=1
		else if (i == "}") scopR += 1
		else if (i == "(") bracketsL += 1
		else if (i == ")") bracketsR += 1
	}
	if ((!code.includes("function")) || (scopR != scopL) || ( bracketsR != bracketsL) || (!code.includes("return"))){
		let [div, icon, p]= createElements("div","img","p")
		div.className = "testResult"
		icon.src = "./img/iconFailed.png"
		p.textContent = `FAILED: SyntaxError: Check if there is an error in the function!`
		div.append(icon,p)
		tester.append(div)
		return;
	}
	if  ((!code.includes(val.nameFun))){
		let [div, icon, p]= createElements("div","img","p")
		div.className = "testResult"
		icon.src = "./img/iconFailed.png"
		p.textContent = `FAILED: ReferenceError: ${val.nameFun} is not defined!!!`
		div.append(icon,p)
		tester.append(div)
		return;
	}

	for (let i in val.testingArg){
		let res = new Function(code + `return ${val.nameFun}(${val.testingArg[i]})`)
		
		if (res() == (val.testingAns)[i]){
			let [div, icon, p]= createElements("div","img","p")
			div.className = "testResult"
			icon.src = "./img/iconComplainte.png"
			p.textContent = `Test Passed: Value == ${val.testingAns[i]}`
			div.append(icon,p)
			tester.append(div)
		}

		else {
			let [div, icon, p]= createElements("div","img","p")
			div.className = "testResult"
			icon.src = "./img/iconFailed.png"
			p.textContent = `FAILED: Answer failed!; ---  Answer: ${val.testingAns[i]}`
			div.append(icon,p)
			tester.append(div)
		}
	}
}

