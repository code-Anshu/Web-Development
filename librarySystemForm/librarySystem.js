
document.getElementById('libraryForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    if (formValidate()) {
        // Optionally submit the form here if validation is successful
        console.log("Form validation successful. Form can be submitted.");
    }
});

function setError(id, error) {
    //Prints error statement
    let element = document.getElementById(id);
    console.log(element);
    element.getElementsByClassName('errormsg')[0].innerText = error; // Corrected 'innertext' to 'innerText'
}

function clearErrors() {
    let errors = document.getElementsByClassName('errormsg');
    for (let item of errors) {
        item.innerHTML = "";
    }
}

function formValidate() {
    let returnVal = true;
    clearErrors();

    //Assigning regular expressions for input fields
    const name = /^[a-zA-Z]{3,10}$/; // Corrected regex
    const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const phone = /^\+?([0-9]{2})[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;
    const phone = /^\+91[-. ]?\d{5}[-. ]?\d{5}$/;
    const address = /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":.?!/]+$/;
    const subD = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

    // For firstName
    const firstName = document.forms['libraryForm']['fname'].value;
    console.log(firstName);

    if (firstName.length < 3 || !name.test(firstName)) {
        setError("namef", "Name must be 3 to 10 characters long and contain only letters.");
        returnVal = false;
    }

    const lastName = document.forms['libraryForm']['lname'].value;
    console.log(lastName);

    if (lastName.length < 3 || !name.test(lastName)) {
        setError("namel", "Name must be 3 to 10 characters long and contain only letters.");
        returnVal = false;
    }

    const inputEmail = document.forms['libraryForm']['email'].value;
    console.log(inputEmail);

    if (!email.test(inputEmail)) {
        setError("email", "Enter a valid email.");
        returnVal = false;
    }

    const phoneNo = document.forms['libraryForm']['phNo'].value;
    console.log(phoneNo);

    if (!phone.test(phoneNo) || phoneNo.length<10) {
        setError("phone", "Format should be +91-XXXXX-XXXXX.");
        returnVal = false;
    }

    const inputAddress = document.forms['libraryForm']['address'].value;
    console.log(inputAddress);

    if (!address.test(inputAddress)) {
        setError("address", "Address should be 5 to 500 characters long and contain only valid special characters.");
        returnVal = false;
    }

    // Validate at least two checkboxes are selected
    const subject = document.querySelectorAll('input[name="subject"]:checked');
    console.log(subject);

    if (subject.length < 2) {
        setError("subjects", "Select at least two subjects.");
        returnVal = false;
    }

    const course = document.forms['libraryForm']['course'].value;
    console.log(course);

    const submissionDate = document.forms['libraryForm']['subDate'].value;
    console.log(submissionDate);      

// console.log(formattedDate);
    if (!subD.test(submissionDate)) {
        setError("submissionDate", "Format of date should be dd-mm-yyyy.");
        returnVal = false;
    }

    // Display form data
    document.getElementById('displayFname').textContent = firstName;
    document.getElementById('displayLname').textContent = lastName;
    document.getElementById('displayEmail').textContent = inputEmail;
    document.getElementById('displayPhNo').textContent = phoneNo;
    document.getElementById('displayAddress').textContent = inputAddress;
    document.getElementById('displayCourse').textContent = course;
    document.getElementById('displaySubject').textContent = Array.from(subject).map(s => s.value).join(', ');
    document.getElementById('displaySubDate').textContent = submissionDate;

    return returnVal;
}
