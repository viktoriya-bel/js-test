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
	// console.log(val)
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
		const pencilIcon =
			'<svg class="bi bi-pencil js-editPeople" width="1em" height="1em" title="Изменить" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
			'  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>\n' +
			'  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>\n' +
			"</svg>"
		tablePeople +=
			'<tr><th scope="row">' +
			i +
			'</th><th id="first">' +
			item.name.first +
			pencilIcon +
			'</th><th id="last">' +
			item.name.last +
			pencilIcon +
			'</th><th id="date">' +
			item.dob.date +
			pencilIcon +
			'</th><th><img src="' +
			item.picture.thumbnail +
			'"/></th><th>'
		tablePeople +=
			'<i class="icon-pencil" title="Изменить профессию"></i></th>' +
			'<th><i class="icon-eye-open" title="Посмотреть обязанности"></i></th>' +
			'<th><svg class="bi bi-trash js-removePeople" title="Удалить" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
			'  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>\n' +
			'  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>\n' +
			"</svg></th></tr>"
	})
	document.getElementById("table-people").innerHTML = tablePeople
}

$(".js-form-search").submit(function() {
	// eslint-disable-next-line new-cap
	PeopleView()
	event.preventDefault()
})

/*
Данный фрагмент выдает ошибку,
т.к. document.getElementsByClassName('removeAll') возвращает коллекцию,
поэтому легче и как мне кажется разумнее всего использовать jQuery

document.getElementsByClassName('removeAll').addEventListener('click', peopleRemove());
*/
$(".js-removePeople").click(function() {
	// eslint-disable-next-line no-invalid-this
	const element = this.parentElement.parentElement
	const index = Number(element.firstElementChild.innerHTML)
	// eslint-disable-next-line new-cap
	RemoveAll(element, PeopleArray, index)
})

// eslint-disable-next-line require-jsdoc
function RemoveAll(element, arr, index) {
	arr.splice(index, 1)
	const parentElements = element.parentElement
	element.remove()
	for (index; index < arr.length; index++) {
		parentElements.children[index].firstElementChild.innerHTML = index
	}
}

$(".js-table-people").on("click", ".js-editPeople", function() {
	// eslint-disable-next-line no-invalid-this
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

$(".js-table-people").on("click", ".js-save-Edit-People", function() {
	// eslint-disable-next-line no-invalid-this
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
	$("#ModalAdd").modal("hide")
	const firstAddVal = $(".js-first-add").val()
	const lastAddVal = $("#js-last-add").val()
	const dateAddVal = $("js-date-add").val()
	console.log(firstAddVal)
	const thumbnailAddVal = $("#thumbnail-add").val()
	PeopleArray.push({
		name: { first: firstAddVal, last: lastAddVal },
		dob: { date: dateAddVal },
		picture: { thumbnail: thumbnailAddVal }
	})
	$(this).val("")
	console.log(PeopleArray)
})
$("body").on("click", ".js-submit-Add", function() {
	$("#ModalAdd").modal("hide")
	const firstAddVal = $(".js-first-add").val()
	const lastAddVal = $("#js-last-add").val()
	const dateAddVal = $("js-date-add").val()
	console.log(firstAddVal)
	const thumbnailAddVal = $("#thumbnail-add").val()
	// PeopleArray.push({
	// 	name: { first: firstAddVal, last: lastAddVal },
	// 	dob: { date: dateAddVal },
	// 	picture: { thumbnail: thumbnailAddVal }
	// })
	// document.formPeopleAdd.reset()
	// let tablePeople = ""
	// tablePeople +=
	// 	'<tr><th scope="row">' +
	// 	(PeopleArray.length - 1) +
	// 	'</th><th id="first">' +
	// 	firstAddVal +
	// 	'<i class="icon-pencil js-editPeople" title="Изменить"></i></th><th id="last">' +
	// 	lastAddVal +
	// 	'<i class="icon-pencil  js-editPeople" title="Изменить"></i></th><th id="date">' +
	// 	dateAddVal +
	// 	'<i class="icon-pencil js-editPeople" title="Изменить"></i></th><th><img src="' +
	// 	thumbnailAddVal +
	// 	'"/></th><th>'
	// tablePeople +=
	// 	'<i class="icon-pencil" title="Изменить профессию"></i></th>' +
	// 	'<th><i class="icon-eye-open" title="Посмотреть обязанности"></i></th>' +
	// 	'<th><svg class="bi bi-trash js-removePeople" title="Удалить" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
	// 	'  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>\n' +
	// 	'  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>\n' +
	// 	"</svg></th></tr>"
	// const table = document.getElementById("table-people")
	// const tr = document.createElement("tr")
	// tr.innerHTML = tablePeople
	// table.appendChild(tr)
})

const ProfessionArr = []
ProfessionArr.push = {
	title: "Программист",
	charge: { 0: "Писать код", 1: "Отрастить бороду" }
}
// eslint-disable-next-line new-cap
ProfessionView()
// eslint-disable-next-line require-jsdoc
function ProfessionView() {
	// let profession = ""
	// ProfessionArr.forEach(function(item, i, arr) {
	// 	profession +=
	// 		'<tr><th scope="row">' +
	// 		i +
	// 		'</th><th id="">' +
	// 		item.title +
	// 		'<i class="icon-pencil" title="Изменить"></i></th><th id=""><ul>'
	// 	/* for (key2 in obj[key].charge) {
	// 		profession += '<li>' + obj[key].charge[key2] + '<i class="icon-pencil" title="Изменить обязанности"></i><i class="icon-remove"  title="Удалить"></i></li>';
	// 	}*/
	// 	profession +=
	// 		'</ul><i class="icon-plus" title="Добавить обязанность"></i></th><th><i class="icon-remove" title="Удалить"></i></th></tr>'
	// })
	// document.getElementById("profession-view").innerHTML = profession
}
