/* eslint-disable no-invalid-this */
import "../../node_modules/bootstrap/scss/bootstrap.scss"
import "../styles/styles.styl"
import $ from "jquery"
import "bootstrap"

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

peopleView()

/**
 * Поиск людей по фамилии и/или имени
 *
 * @param {object} obj - объект, содержащий данные людей
 * @param {string} val - значение из импута поиска
 * @return {boolean}
 */
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
/**
 * Вывод людей с фильтрацией по поиску
 *
 */
function peopleView() {
	const searchVal = document.getElementsByClassName("js-search-input")[0].value
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

/**
 * Построение таблицы для вывода людей
 *
 * @param {number} i - номер итерциии
 * @param {string} nameFirst - Имя человка
 * @param {string} nameLast - Фамилия человка
 * @param {string} date - Дата рождения
 * @param {string} thumbnail - Ссылка на фотографию человека
 * @param {string} profession - Профессия. Если профессия не указана, берется значение по умолчанию - "Безработный"
 * @return {string}
 */
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
 Не нашла как в js отследить клик на уже добавленных в DOM элементов с помощью js,
 поэтому использую jquery
 */
$(".js-table-people").on("click", ".js-removePeople", function() {
	removeAll(
		this.parentElement.parentElement,
		PeopleArray,
		Number(this.parentElement.parentElement.firstElementChild.innerHTML)
	)
})
$(".js-form-search").submit(function() {
	peopleView()
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

/**
 * Функция удаления из массива, который содержит в себе объекты
 *
 * @param {string} element - элемент в DOM
 * @param {array} arr - Массив с данными
 * @param {number} index - Индекс элемента массива
 */
function removeAll(element, arr, index) {
	arr.splice(index, 1)
	const parentElements = element.parentElement
	element.remove()
	for (index; index < arr.length; index++) {
		parentElements.children[index].firstElementChild.innerHTML = index
	}
}

$(".js-table-people").on("click", ".js-save-Edit-People", function() {
	const parElement = this.parentElement
	const elVal = parElement.firstElementChild.value
	const number = Number(parElement.parentElement.firstElementChild.innerHTML)
	editPeopleSave(PeopleArray, parElement.id, elVal, parElement, number)
})

/**
 * Функция сохранения измененных данных в табличке с людьми
 *
 * @param {object} obj - элемент в DOM
 * @param {number} key - Ключ элемента массива
 * @param {string} val - Новое значение
 * @param {string} element - Элемент DOM
 * @param {number} number - Индекс элемента массива
 */
function editPeopleSave(obj, key, val, element, number) {
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
				charge: [{ title: "Писать код" }, { title: "Отрастить бороду" }]
			},
			{
				title: "Дизайнер",
				charge: [{ title: "Рисовать" }, { title: "Придумывать" }]
			}
		]
	}
]

$(".js-ModalProfession-show").on("click", function() {
	professionView(ProfessionArr[0].profession)
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
	professionAddSave(ProfessionArr, val, 0, true)
	professionView(ProfessionArr[0].profession)
	document.getElementsByClassName("js-profession-input-adds")[0].value = ""
})
$("#ModalProfession").on("show.bs.modal", function(e) {
	const errorText = document.getElementsByClassName("js-error-exists")[0]
	errorText.classList.add("hide")
})
/**
 * Функция вывода профессий в таблицу
 *
 * @param {object} arr - объект данных
 */
function professionView(arr) {
	let profession = ""
	if (arr) {
		Object.keys(arr).map(function(objectKey, index) {
			const proffWindows = arr === ProfessionArr[0].profession
			profession +=
				'<tr><th scope="row">' +
				index +
				'</th><th id="">' +
				arr[objectKey].title +
				'<i class="icon-pencil" title="Изменить"></i></th><th id=""><ul>'
			if (proffWindows) {
				if (arr[objectKey].charge) {
					Object.keys(arr[objectKey].charge).map(function(objectKey2, index2) {
						profession +=
							"<li>" +
							arr[objectKey].charge[objectKey2].title +
							'<svg class="bi bi-x js-icon-remove-charge" data-chargeKey="' +
							objectKey2 +
							'" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
							'  <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>\n' +
							'  <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>\n' +
							"</svg></li>"
					})
				}
				profession +=
					'</ul><div class="charge-add-block"><input class="form-control form-control-sm" type="text">' +
					'<svg class="bi bi-plus-square js-charge-add" title="Добавить обязанность" width="1.7em" height="1.7em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
					'  <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>\n' +
					'  <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>\n' +
					'  <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>\n' +
					"</svg></div>"
			} else {
				profession += returnCharge(arr[objectKey].title)
			}

			profession += '</th><th><svg class="bi bi-trash '
			if (proffWindows) profession += "js-removeProfession"
			else profession += "js-removeProfession-people"
			profession +=
				'" title="Удалить" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n' +
				'  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>\n' +
				'  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>\n' +
				"</svg></th></tr>"
		})
	}
	document.getElementsByClassName(
		"js-profession-view"
	)[0].innerHTML = profession
}

/**
 * Вывод обязаностей у людей
 *
 * @param {string} title - Название проффесии
 * @return {string}
 */
function returnCharge(title) {
	let professionCharge = ""
	ProfessionArr[0].profession.forEach(function(item) {
		if (item.title === title) {
			if (item.charge) {
				item.charge.forEach(function(itemCharge) {
					professionCharge += "      <li>" + itemCharge.title + "</li>\n"
				})
			} else {
				professionCharge += "У данной профессии ещё нет обязаностей"
			}
		}
	})
	return professionCharge
}

$(".js-table-people").on("click", ".js-profession-setting", function() {
	const numEl = this.parentElement.parentElement.firstElementChild
	$(".js-ModalProfession").modal("show")
	professionView(PeopleArray[numEl.textContent].profession)
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
		professionAddSave(PeopleArray, val, this.dataset.num, true)
		const el = document.getElementsByClassName("js-table-people")[0]
		el.childNodes[this.dataset.num].querySelector(
			".js-profession-column"
		).innerHTML = professionUpdateTable(
			PeopleArray[this.dataset.num].profession,
			this.dataset.num
		)
		professionView(PeopleArray[this.dataset.num].profession)
	}
)
$(".js-ModalProfession").on("click", ".js-icon-remove-charge", function(event) {
	const index = Number(
		this.parentElement.parentElement.parentElement.parentElement
			.firstElementChild.textContent
	)
	console.log(ProfessionArr[0].profession[index].charge)
	removeAll(
		this.parentElement,
		ProfessionArr[0].profession[index].charge,
		Number(this.dataset.chargekey)
	)
	console.log(ProfessionArr[0].profession[index].charge)
})

$(".js-ModalProfession").on("click", ".js-removeProfession", function() {
	removeAll(
		this.parentElement.parentElement,
		ProfessionArr[0].profession,
		Number(this.parentElement.parentElement.firstElementChild.innerHTML)
	)
})
$(".js-ModalProfession").on("click", ".js-removeProfession-people", function() {
	const el = document.getElementsByClassName("js-profession-add-people-btn")[0]
	removeAll(
		this.parentElement.parentElement,
		PeopleArray[el.dataset.num].profession,
		Number(this.parentElement.parentElement.firstElementChild.innerHTML)
	)
	const elem = document.getElementsByClassName("js-table-people")[0]
	elem.childNodes[el.dataset.num].querySelector(
		".js-profession-column"
	).innerHTML = professionUpdateTable(
		PeopleArray[el.dataset.num].profession,
		el.dataset.num
	)
})

/**
 * Обновление информации о профессии в таблице с людьми
 *
 * @param {Array} arr - Массив обязаностей
 * @return {string}
 */
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

$(".js-ModalProfession").on("click", ".js-charge-add", function() {
	const index = Number(
		this.parentElement.parentElement.parentElement.firstElementChild.textContent
	)
	const input = this.parentElement.firstElementChild
	professionAddSave(ProfessionArr[0].profession, input.value, index)
	professionView(ProfessionArr[0].profession)
	input.value = ""
})

/**
 * Сохранение новой профессии и обязанности
 *
 * @param {object} obj - Массив в котором находятся профессии и/или обязанности
 * @param {string} val - Новое значение для сохранения
 * @param {number} number - Индекс массива
 * @param {boolean} prof - Флаг для различия профессий от обязаностей
 */
function professionAddSave(obj, val, number, prof = false) {
	const errorText = document.getElementsByClassName("js-error-exists")[0]
	if (obj[number].profession === undefined && prof === true) {
		obj[number].profession = [
			{
				title: val
			}
		]
		console.log("ProfessionСheck1")
	} else if (obj[number].charge === undefined && prof === false) {
		obj[number].charge = [
			{
				title: val
			}
		]
		console.log("ProfessionСheck1")
	} else {
		let objec = obj[number].charge
		if (prof) {
			objec = obj[number].profession
		}
		if (professionСheck(objec, val) === true) {
			errorText.classList.remove("hide")
		} else {
			errorText.classList.add("hide")
			const length = Object.keys(objec).length
			objec[length] = {
				title: val
			}
		}
	}
}

/**
 * Проверка при добавлении новой профессии или обязанности. Если значение уже имеется, то возвращает true
 *
 * @param {Array/object} obj - Массив обязаностей или объект профессий
 * @param {string} val - Новое значение из инпута
 * @return {boolean}
 */
function professionСheck(obj, val) {
	let flag = false
	if (obj) {
		Object.keys(obj).map(function(objectKey) {
			const title = String(obj[objectKey].title)
			if (title.toUpperCase() === val.toUpperCase()) {
				flag = true
			}
		})
	}
	return flag
}
