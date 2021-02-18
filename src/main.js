var students = [],
	goNextButton = document.getElementById("goNext"),
	goBackButton = document.getElementById("goBack"),
	forms = document.getElementsByClassName("Form"),
	formButton = document.getElementById("formButton")
	form_number = 0;


formButton.addEventListener('click', () => {
	if(form_number == 0){

	let nameInputEl = document.getElementById('studentName_insert');
	let idInputEl = document.getElementById('studentID_insert');
	let gdpaInputEl = document.getElementById('studentGPA_insert');

	// Validation for input
	inputValidation(nameInputEl.value, idInputEl.value, gdpaInputEl.value);
	// ID must be unique 
	if(findStudent(idInputEl.value) == -1){
		// insert student
		insertStudent(nameInputEl.value, idInputEl.value, gdpaInputEl.value);

	} else {
		//deny request	
		alert("Student with ID : " + idInputEl.value + " already exist")
	}

	} else if(form_number == 1){
		let studentIDDelete = document.getElementById('studentID_Delete');

		inputValidation(studentIDDelete.value);
		let temp = findStudent(studentIDDelete.value);

		if(temp != -1){
			deleteStudent(temp);
		} else{
			alert('Student with ID : ' + studentIDDelete.value + ' doesn\'t exist');
		}

	} else {
		let studentNameUpdate = document.getElementById('studentName_update');
		let studentIDUpdate = document.getElementById('studentID_Update');
		let studentGPAUpdate = document.getElementById('studentGPA_update');

		inputValidation(studentNameUpdate.value , studentIDUpdate.value , studentGPAUpdate.value);
		let temp = findStudent(studentIDUpdate.value)

		if(temp != -1){
			updateStudent(temp , studentNameUpdate.value , studentGPAUpdate.value);
		} else{
			alert('Student with ID : ' + studentIDUpdate.value + ' doesn\'t exist');
		}
	}
});

goNextButton.addEventListener('click' , () =>{
	if(form_number == 0){

		forms[form_number].classList.add("disableForm");
		forms[form_number].classList.remove("activeForm");

		goNextButton.innerText = "Go to Update Form";

		goBackButton.disabled = false;
		goBackButton.innerText = "Go back to Insert form";

		form_number = 1;

		formButton.innerText = "Delete";
		forms[form_number].classList.add("activeForm");
		forms[form_number].classList.remove("disableForm");
	} else{
		forms[form_number].classList.remove("activeForm");
		forms[form_number].classList.add("disableForm");

		form_number = 2;
		forms[form_number].classList.remove("disableForm");
		forms[form_number].classList.add("activeForm");

		formButton.innerText = "Update";
		goNextButton.disabled = true;
		goBackButton.innerText = "Go back to delete form";
	}
})

goBackButton.addEventListener('click' ,()=>{
	if(form_number == 2){
		goBackButton.innerText = "Go back to Insert form";

		forms[form_number].classList.add("disableForm");
		forms[form_number].classList.remove("activeForm");

		form_number = 1
		forms[form_number].classList.add("activeForm");
		forms[form_number].classList.remove("disableForm");


		formButton.innerText = "Delete";
		goNextButton.disabled = false;
		goNextButton.innerText = "Go to Update Form";
	} else{
		forms[form_number].classList.remove("activeForm");
		forms[form_number].classList.add("disableForm");


		form_number = 0;
		forms[form_number].classList.add("activeForm");
		forms[form_number].classList.remove("disableForm");

		goBackButton.disabled = true;
		goBackButton.innerText = "back";

		formButton.innerText = "Submit";
		goNextButton.innerText = "Go to Delete Form";
	}
})

function inputValidation(name, id, gdpa) {
	// check for the value of each element

	if (name == '') {
		alert('Please insert the student name');
	}

	if (id == '') {
		alert('Please insert the student id number');
	}

	if (gdpa == '') {
		alert('Please insert the student gdpa');
	}
}


function inputValidation(id){ 
	//overloaded function to validate one input (ID)

	if(id == ''){
		alert('please insert the student id number');
	}
}

function insertStudent(name, id, gdpa) {
	let student = {
		name: name,
		id: id,
		gdpa: gdpa,
	};
	students.push(student);
    console.log('students array: ', students);
}

function findStudent(p_id){
	for(i = 0 ; i <students.length ; i++){
		if (students[i].id == p_id)
			return i;
	}
	return -1; // not found 
}

function deleteStudent(st_location){
	students.splice(st_location, 1);
	console.log("students after deleting a student : " , students);
}

function updateStudent(st_location , st_name , st_Gpa){
	students[st_location].name = st_name;
	students[st_location].gdpa = st_Gpa;

	console.log("students after Updating a student : " , students);
}
