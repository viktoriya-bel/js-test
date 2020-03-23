import "../../node_modules/bootstrap/scss/bootstrap.scss"
import "../styles/styles.styl"
import $ from "jquery"
import "@fortawesome/fontawesome-free/js/fontawesome"
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
		tablePeople +=
			'<tr><th scope="row">' +
			i +
			'</th><th id="first">' +
			item.name.first +
			'<i class="icon-pencil editPeople" title="Изменить"></i></th><th id="last">' +
			item.name.last +
			'<i class="icon-pencil  editPeople" title="Изменить"></i></th><th id="date">' +
			item.dob.date +
			'<i class="icon-pencil editPeople" title="Изменить"></i></th><th><img src="' +
			item.picture.thumbnail +
			'"/></th><th>'
		tablePeople +=
			'<i class="icon-pencil" title="Изменить профессию"></i></th>' +
			'<th><i class="icon-eye-open" title="Посмотреть обязанности"></i></th>' +
			'<th><i class="icon-remove removePeople"  title="Удалить"></i></th></tr>'
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
$(".removePeople").click(function() {
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

$(".editPeople").click(function() {
	// eslint-disable-next-line no-invalid-this
	const parElement = this.parentElement
	if (parElement.id === "date") {
		parElement.innerHTML =
			'<input type="date"><i class="icon-ok save-Edit-People" title="Сохранить">'
	} else {
		parElement.innerHTML =
			'<input type="text"><i class="icon-ok save-Edit-People" title="Сохранить">'
	}
})

$(".js-table-people").on("click", ".save-Edit-People", function() {
	// eslint-disable-next-line no-invalid-this
	const parElement = this.parentElement
	const elVal = parElement.firstElementChild.value
	const number = Number(parElement.parentElement.firstElementChild.innerHTML)
	// eslint-disable-next-line new-cap
	EditPeopleSave(PeopleArray, parElement.id, elVal, parElement, number)
})

// eslint-disable-next-line require-jsdoc
function EditPeopleSave(obj, key, val, element, number) {
	if (key === "date") {
		obj[number].dob[key] = val
		element.innerHTML =
			val + '<i class="icon-pencil  editPeople" title="Изменить"></i>'
	} else {
		obj[number].name[key] = val
		element.innerHTML =
			val + '<i class="icon-pencil  editPeople" title="Изменить"></i>'
	}
}

$(".submit-Add").click(function() {
	$("#ModalAdd").modal("hide")
	const firstAddVal = $("#first-add").val()
	const lastAddVal = $("#last-add").val()
	const dateAddVal = $("#date-add").val()
	const thumbnailAddVal = $("#thumbnail-add").val()
	PeopleArray.push({
		name: { first: firstAddVal, last: lastAddVal },
		dob: { date: dateAddVal },
		picture: { thumbnail: thumbnailAddVal }
	})
	document.formPeopleAdd.reset()
	let tablePeople = ""
	tablePeople +=
		'<tr><th scope="row">' +
		(PeopleArray.length - 1) +
		'</th><th id="first">' +
		firstAddVal +
		'<i class="icon-pencil editPeople" title="Изменить"></i></th><th id="last">' +
		lastAddVal +
		'<i class="icon-pencil  editPeople" title="Изменить"></i></th><th id="date">' +
		dateAddVal +
		'<i class="icon-pencil editPeople" title="Изменить"></i></th><th><img src="' +
		thumbnailAddVal +
		'"/></th><th>'
	tablePeople +=
		'<i class="icon-pencil" title="Изменить профессию"></i></th>' +
		'<th><i class="icon-eye-open" title="Посмотреть обязанности"></i></th>' +
		'<th><i class="icon-remove removePeople"  title="Удалить"></i></th></tr>'
	const table = document.getElementById("table-people")
	const tr = document.createElement("tr")
	tr.innerHTML = tablePeople
	table.appendChild(tr)
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
	let profession = ""
	ProfessionArr.forEach(function(item, i, arr) {
		profession +=
			'<tr><th scope="row">' +
			i +
			'</th><th id="">' +
			item.title +
			'<i class="icon-pencil" title="Изменить"></i></th><th id=""><ul>'
		/* for (key2 in obj[key].charge) {
			profession += '<li>' + obj[key].charge[key2] + '<i class="icon-pencil" title="Изменить обязанности"></i><i class="icon-remove"  title="Удалить"></i></li>';
		}*/
		profession +=
			'</ul><i class="icon-plus" title="Добавить обязанность"></i></th><th><i class="icon-remove" title="Удалить"></i></th></tr>'
	})
	document.getElementById("profession-view").innerHTML = profession
}
