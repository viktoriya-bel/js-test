/* eslint-disable no-invalid-this */
import "../../node_modules/bootstrap/scss/bootstrap.scss"
import "../styles/styles.styl"
import $ from "jquery"
// eslint-disable-next-line no-unused-vars
import bootstrap from "bootstrap"

console.log("webpack starterkit")
let obj = $.ajax({
	url: "https://randomuser.me/api/?results=25",
	dataType: "json",
	global: false,
	async: false,
	success: function(data) {
		return data
	}
}).responseText

obj = JSON.parse(obj)

let PeopleArray = []
PeopleArray = obj.results

// eslint-disable-next-line new-cap
PeopleView()

// eslint-disable-next-line require-jsdoc
function searchExists(obj, val) {
	const objVal = val.split(" ")
	const nameFirst = obj.name.first
	const nameLast = obj.name.last
	for (const valOb of objVal) {
		if (
			String(nameFirst.toLowerCase()).includes(valOb.toLowerCase()) ||
			String(nameLast.toLowerCase()).includes(valOb.toLowerCase())
		) {
			return true
		} else {
			return false
		}
	}
}
// eslint-disable-next-line require-jsdoc
function PeopleView() {
	const searchVal = $(".js-search-input").val()
	let tablePeople = ""
	const PeopleArrayFilter = PeopleArray.filter(obj => {
		let flag = false
		Object.values(obj).forEach(() => {
			if (searchExists(obj, searchVal)) {
				flag = true
				return
			}
		})
		if (flag) return obj
	})
	PeopleArrayFilter.forEach(function(item, i, arr) {
		tablePeople += tablePeopleRowBuild(
			i,
			item.name.first,
			item.name.last,
			item.dob.date,
			item.picture.thumbnail
		)
	})
	document.getElementsByClassName("js-table-people")[0].innerHTML = tablePeople
}

// eslint-disable-next-line require-jsdoc
function tablePeopleRowBuild(
	i,
	nameFirst,
	nameLast,
	date,
	thumbnail,
	profession = [{ title: "Безработный" }]
) {
	let tablePeople = ""
	const pencilIcon =
		'<svg class="bi bi-pencil js-editPeople" width="1em" height="1em" title="Изменить" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
		'  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>\n' +
		'  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>\n' +
		"</svg>"
	tablePeople +=
		'<tr><th scope="row">' +
		i +
		'</th><th id="first">' +
		nameFirst +
		pencilIcon +
		'</th><th id="last">' +
		nameLast +
		pencilIcon +
		'</th><th id="date">' +
		date +
		pencilIcon +
		'</th><th><img src="' +
		thumbnail +
		'"/></th><th class="js-profession-column">'
	tablePeople +=
		professionUpdateTable(profession) +
		"</th>" +
		'<th><i class="icon-eye-open" title="Посмотреть обязанности"></i></th>' +
		'<th><svg class="bi bi-trash js-removePeople" title="Удалить" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
		'  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>\n' +
		'  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>\n' +
		"</svg></th></tr>"
	return tablePeople
}

/* Через jquery это проще и меньше кода +
 Не нашла как в js отследить клик на добавленных в DOM элементов с помощью js,
 поэтому использую jquery
 */
$(".js-table-people").on("click", ".js-removePeople", function() {
	// eslint-disable-next-line new-cap
	RemoveAll(
		this.parentElement.parentElement,
		PeopleArray,
		Number(this.parentElement.parentElement.firstElementChild.innerHTML)
	)
})
$(".js-form-search").submit(function() {
	// eslint-disable-next-line new-cap
	PeopleView()
	event.preventDefault()
})

$(".js-table-people").on("click", ".js-editPeople", function() {
	const parElement = this.parentElement
	const okIcon =
		'<svg class="bi bi-file-earmark-check js-save-Edit-People" width="1em" height="1em"  title="Сохранить" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
		'  <path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/>\n' +
		'  <path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>\n' +
		"</svg>"
	if (parElement.id === "date") {
		parElement.innerHTML = '<input type="date">' + okIcon
	} else {
		parElement.innerHTML = '<input type="text">' + okIcon
	}
})
// window.onload = function() {
// 	const removePeople = document.getElementsByClassName("js-removePeople")
// 	const formSearch = document.getElementsByClassName("js-form-search")
// 	const editPeople = document.getElementsByClassName("js-editPeople")
// 	// const saveEditPeople = document.getElementsByClassName("js-save-Edit-People")
//
// 	for (let i = 0; i < removePeople.length; i++) {
// 		removePeople[i].onclick = function() {
// 			// eslint-disable-next-line new-cap
// 			RemoveAll(
// 				this.parentElement.parentElement,
// 				PeopleArray,
// 				Number(this.parentElement.parentElement.firstElementChild.innerHTML)
// 			)
// 		}
// 	}
// 	for (let i = 0; i < formSearch.length; i++) {
// 		formSearch[i].onclick = function() {
// 			// eslint-disable-next-line new-cap
// 			PeopleView()
// 			event.preventDefault()
// 		}
// 	}
// 	for (let i = 0; i < editPeople.length; i++) {
// 		editPeople[i].onclick = function() {
// 			const parElement = this.parentElement
// 			const okIcon =
// 				'<svg class="bi bi-file-earmark-check js-save-Edit-People" width="1em" height="1em"  title="Сохранить" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
// 				'  <path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/>\n' +
// 				'  <path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>\n' +
// 				"</svg>"
// 			if (parElement.id === "date") {
// 				parElement.innerHTML = '<input type="date">' + okIcon
// 			} else {
// 				parElement.innerHTML = '<input type="text">' + okIcon
// 			}
// 		}
// 	}
// 	// for (let i = 0; i < saveEditPeople.length; i++) {
// 	// 	saveEditPeople[i].onclick = function() {
// 	//
// 	// 	}
// 	// }
// }

// eslint-disable-next-line require-jsdoc
function RemoveAll(element, arr, index) {
	arr = Array.prototype.slice.call(arr)
	arr.splice(index, 1)
	const parentElements = element.parentElement
	element.remove()
	for (index; index < arr.length; index++) {
		console.log(parentElements.children[index].firstElementChild)
		parentElements.children[index].firstElementChild.innerHTML = index
	}
}

$(".js-table-people").on("click", ".js-save-Edit-People", function() {
	const parElement = this.parentElement
	const elVal = parElement.firstElementChild.value
	const number = Number(parElement.parentElement.firstElementChild.innerHTML)
	// eslint-disable-next-line new-cap
	EditPeopleSave(PeopleArray, parElement.id, elVal, parElement, number)
})

// eslint-disable-next-line require-jsdoc
function EditPeopleSave(obj, key, val, element, number) {
	const pencilIcon =
		'<svg class="bi bi-pencil js-editPeople" width="1em" height="1em" title="Изменить" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
		'  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>\n' +
		'  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>\n' +
		"</svg>"
	if (key === "date") {
		obj[number].dob[key] = val
		element.innerHTML = val + pencilIcon
	} else {
		obj[number].name[key] = val
		element.innerHTML = val + pencilIcon
	}
}

$(".js-ModalAdd").submit(function() {
	event.preventDefault()
	$(".js-Modal-Add").modal("hide")
	const firstAddVal = $(".js-first-add").val()
	const lastAddVal = $(".js-last-add").val()
	const dateAddVal = $(".js-date-add").val()
	const thumbnailAddVal = $("#thumbnail-add").val()
	PeopleArray.push({
		name: { first: firstAddVal, last: lastAddVal },
		dob: { date: dateAddVal },
		picture: { thumbnail: thumbnailAddVal }
	})
	$(this)[0].reset()
	const tablePeople = tablePeopleRowBuild(
		PeopleArray.length - 1,
		firstAddVal,
		lastAddVal,
		dateAddVal,
		thumbnailAddVal
	)
	const table = document.getElementById("table-people")
	const tr = document.createElement("tr")
	tr.innerHTML = tablePeople
	table.appendChild(tr)
})

const ProfessionArr = [
	{
		profession: [
			{
				title: "Программист",
				charge: { 0: "Писать код", 1: "Отрастить бороду" }
			},
			{
				title: "Дизайнер",
				charge: { 0: "Рисовать", 1: "Придумывать" }
			}
		]
	}
]

$(".js-ModalProfession-show").on("click", function() {
	// eslint-disable-next-line new-cap
	ProfessionView(ProfessionArr[0].profession)
	const professionBlockAdd =
		'<input class="form-control js-profession-input-adds" type="text" placeholder="Введите название профессии">'
	document.getElementsByClassName(
		"js-profession-adds"
	)[0].innerHTML = professionBlockAdd
	document.getElementsByClassName("js-modal-btn")[0].innerHTML =
		' <button class="btn  btn-primary js-profession-add-btn" type="button"> Добавить профессию </button>'
})
$(".js-ModalProfession").on("click", ".js-profession-add-btn", function() {
	const val = document.getElementsByClassName("js-profession-input-adds")[0]
		.value
	// const length = Object.keys(obj[number].profession).length
	console.log(ProfessionArr)
	// eslint-disable-next-line new-cap
	ProfessionAddSave(ProfessionArr, val, 0)
	console.log(ProfessionArr)
	// eslint-disable-next-line new-cap
	ProfessionView(ProfessionArr[0].profession)
	document.getElementsByClassName("js-profession-input-adds")[0].value = ""
})
$("#ModalProfession").on("show.bs.modal", function(e) {
	const errorText = document.getElementsByClassName("js-error-exists")[0]
	errorText.classList.add("hide")
})
// eslint-disable-next-line require-jsdoc
function ProfessionView(arr) {
	let profession = ""
	if (arr) {
		Object.keys(arr).map(function(objectKey, index) {
			profession +=
				'<tr><th scope="row">' +
				index +
				'</th><th id="">' +
				arr[objectKey].title +
				'<i class="icon-pencil" title="Изменить"></i></th><th id=""><ul>'
			/* for (key2 in obj[key].charge) {
				profession += '<li>' + obj[key].charge[key2] + '<i class="icon-pencil" title="Изменить обязанности"></i><i class="icon-remove"  title="Удалить"></i></li>';
			}*/
			profession +=
				'</ul><i class="icon-plus" title="Добавить обязанность"></i></th><th><i class="icon-remove" title="Удалить"></i></th>'
			profession +=
				'<th><svg class="bi bi-trash js-removeProfession" title="Удалить" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
				'  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>\n' +
				'  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>\n' +
				"</svg></th></tr>"
		})
	}
	document.getElementsByClassName(
		"js-profession-view"
	)[0].innerHTML = profession
}

$(".js-table-people").on("click", ".js-profession-setting", function() {
	const numEl = this.parentElement.parentElement.firstElementChild
	$(".js-ModalProfession").modal("show")
	// console.log(PeopleArray[numEl.textContent].profession)
	// eslint-disable-next-line new-cap
	ProfessionView(PeopleArray[numEl.textContent].profession)
	let professionBlockAdd =
		'<div class="dropdown mr-1">\n' +
		'    <select class="form-control js-profession-people-adds" id="exampleFormControlSelect1">\n'
	ProfessionArr[0].profession.forEach(function(item, i, arr) {
		professionBlockAdd += "      <option>" + item.title + "</option>\n"
	})
	professionBlockAdd += "    </select>\n" + "  </div>"
	document.getElementsByClassName(
		"js-profession-adds"
	)[0].innerHTML = professionBlockAdd
	document.getElementsByClassName("js-modal-btn")[0].innerHTML =
		' <button class="btn  btn-primary js-profession-add-people-btn" type="button" data-num="' +
		numEl.textContent +
		'"> Добавить профессию </button>'
})

$(".js-ModalProfession").on(
	"click",
	".js-profession-add-people-btn",
	function() {
		const val = document.getElementsByClassName("js-profession-people-adds")[0]
			.value
		// eslint-disable-next-line new-cap
		ProfessionAddSave(PeopleArray, val, this.dataset.num)
		// eslint-disable-next-line new-cap
		ProfessionView(PeopleArray[this.dataset.num].profession)
	}
)
$(".js-ModalProfession").on("click", ".js-removeProfession", function() {
	// eslint-disable-next-line new-cap
	// ProfessionDelete(PeopleArray, this)
	// eslint-disable-next-line new-cap
	const el = document.getElementsByClassName("js-profession-add-people-btn")[0]
	console.log(el)
	console.log(PeopleArray[el.dataset.num].profession)
	console.log(this.parentElement.parentElement)
	console.log(Number(this.parentElement.parentElement.firstElementChild.innerHTML))
	RemoveAll(
		this.parentElement.parentElement,
		PeopleArray[el.dataset.num].profession,
		Number(this.parentElement.parentElement.firstElementChild.innerHTML)
	)
	// eslint-disable-next-line new-cap
	// ProfessionView(PeopleArray[this.dataset.num].profession)
})

// eslint-disable-next-line require-jsdoc
function professionUpdateTable(arr) {
	let html = ""
	Object.keys(arr).map(function(key, index) {
		html += arr[key].title + "</br>"
	})
	html +=
		'<svg class="bi bi-gear js-profession-setting" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
		'  <path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319z" clip-rule="evenodd"/>\n' +
		'  <path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z" clip-rule="evenodd"/>\n' +
		"</svg>"
	return html
}

// eslint-disable-next-line require-jsdoc
function ProfessionAddSave(obj, val, number) {
	const errorText = document.getElementsByClassName("js-error-exists")[0]
	// eslint-disable-next-line new-cap
	if (ProfessionСheck(obj[number].profession, val) === true) {
		errorText.classList.remove("hide")
	} else {
		errorText.classList.add("hide")
		if (obj[number].profession == undefined) {
			obj[number].profession = {
				0: {
					title: val
				}
			}
			console.log("ProfessionСheck1")
		} else {
			const length = Object.keys(obj[number].profession).length
			obj[number].profession[length] = {
				title: val
			}
		}
		const el = document.getElementsByClassName("js-table-people")[0]
		el.childNodes[number].querySelector(
			".js-profession-column"
		).innerHTML = professionUpdateTable(obj[number].profession, number)
	}
}
// eslint-disable-next-line require-jsdoc
function ProfessionDelete(obj, el) {
	console.log(obj)
	console.log(el)
	// const length = Object.keys(obj[number].profession).length
	// obj[number].profession[length] = {
	// 	title: val
	// }
	// const el = document.getElementsByClassName("js-table-people")[0]
	// el.childNodes[number].querySelector(
	// 	".js-profession-column"
	// ).innerHTML = professionUpdateTable(obj[number].profession, number)
}

// eslint-disable-next-line require-jsdoc
function ProfessionСheck(obj, val) {
	let flag = false
	if (obj) {
		Object.keys(obj).map(function(objectKey, index) {
			const title = String(obj[objectKey].title)
			if (title.toUpperCase() == val.toUpperCase()) {
				flag = true
			}
		})
	}
	return flag
}
