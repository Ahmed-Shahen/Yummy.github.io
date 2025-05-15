
$('#toggleBtn').click(() => {

    let menuBoxWidth = $('.nav-menu').outerWidth();
    if ($('.side-nav').css("left") == '0px') {
        $('.side-nav').animate({ left: `${menuBoxWidth}` }, 100)
        $('.nav-menu  li').animate({ opacity: '1' }, 50);
        $('.nav-menu  li').animate({ paddingTop: '25px' }, 1100);
    }
    else {
        $('.side-nav').animate({ left: `0` }, 100);
        $("nav-menu li").animate({ opacity: '0' }, 50);
        $("nav-menu li").animate({ paddingTop: '500px' });

    }
    $('.nav-menu').toggleClass('open');
    $(".toggel-menu i").toggleClass('fa-times')
})

let rowData = document.getElementById('rowData');
let searchContainer = document.getElementById("searchContainer");
let submitBtn = document.getElementById("submitBtn");

searchByName("");


let lis = document.querySelectorAll('ul li');

for (i = 0; i < lis.length; i++) {


    lis[i].addEventListener('click', function (e) {

        if (e.target.innerHTML == "Categories") {
            getCategory();
        }
        else if (e.target.innerHTML == "Area") {
            getArea();
        }
        else if (e.target.innerHTML == "Ingredients") {
            getIngredients();
        }
        else if (e.target.innerHTML == "Contact Us") {
            showContact();
        }else {
            showSearch()
        }

    })
}

function displayMeals(type){
    let cartoona = "";

    for(let i = 0 ; i<type.length ; i++){
        cartoona += `
            <div class="col-md-3">
                <div onclick="getMealDetails('${type[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer my-4">
                    <img class="w-100" src="${type[i].strMealThumb}" alt="" srcset="">
                    <div class="meal layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${type[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona;
}

async function getCategory() {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    displayCategory(response.categories);
    console.log(response.categories);
}

function displayCategory(type){
        searchContainer.innerHTML = "";

    var cartoona = ``

    for(var i = 0; i < type.length ; i++){
        cartoona += `
            <div class="col-md-6 col-lg-4 my-3 shadow ">
                    <div onclick="getCategoryMeals('${type[i].strCategory}')" class="meal shadow rounded-2 position-relative cursor-pointer">
                        <div class="post">
                            <img src="${type[i].strCategoryThumb}" class="img-fluid rounded-2 w-100">
                            <div class="layer d-flex align-items-center">
                                <div >
                                    <h2 class="text-capitalize fw-bold">${type[i].strCategory}</h2>
                                    <p class="text-center">${type[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = cartoona;
}


async function getArea() {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    displayArea(response.meals);
    console.log(response.meals);
}

function displayArea(type){
        searchContainer.innerHTML = "";

    var cartoona = ``

    for(var i = 0; i < type.length ; i++){
        cartoona += `
            <div class="col-md-3">
                <div onclick="getAreaMeals('${type[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="text-white fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="text-white">${type[i].strArea}</h3>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}

async function getIngredients() {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    displayIngredients(response.meals.slice(0, 20));
    console.log(response.meals);
}

function displayIngredients(type){
    searchContainer.innerHTML = "";
    var cartoona = ``

    for(var i = 0; i < type.length ; i++){
        cartoona += `
            <div class="col-md-3">
                <div   onclick="getIngredientsMeals('${type[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                        <h3 class="text-white">${type[i].strIngredient}</h3>
                        <p class="text-white">${type[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}

async function getCategoryMeals(category) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
}

async function getIngredientsMeals(category) {
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    displayMeals(response.meals.slice(0, 20))
}

async function getMealDetails(mealID) {
    rowData.innerHTML = ""
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
}

function displayMealDetails(meal){

    searchContainer.innerHTML = "";



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class = "text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white text-left">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
            
                <h3>Tags :</h3>
                

                

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona


}

function showContact() {
    searchContainer.innerHTML = "";
    rowData.innerHTML = `<section id="contact" class="container  w-75 mx-auto my-5 ">
        <h2 class="text-light my-5">ContacUs...</h2>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control" id="name" placeholder="Enter Your Name">
                    <div class="alert alert-danger d-none" id="namealert" role="alert">
                        Your Name is not valid
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control" id="email" placeholder="Enter Email">
                    <div class="alert alert-danger d-none" id="emailalert" role="alert">
                        entre valid email
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control" id="phone" placeholder="Enter phone">
                    <div class="alert alert-danger d-none" id="phonealert" role="alert">
                        entre valid phone
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control" id="age" placeholder="Enter Age">
                    <div class="alert alert-danger d-none" id="agealert" role="alert">
                        entre valid Age
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control" type="password" id="password" placeholder="Enter Password">
                    <div class="alert alert-danger d-none" id="passwordalert" role="alert">
                        entre valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input class="form-control" type="password" id="rePassword" placeholder="Enter RePassword">
                    <div class="alert alert-danger d-none" id="repasswordalert" role="alert">
                        entre valid Repassword
                    </div>
                </div>
            </div>


        </div>

        <button type="submit"  id="submitBtn" class="btn btn-outline-danger">Submit</button>

    </section> -->`

    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var ageInput = document.getElementById('age');
    var passwordInput = document.getElementById('password');
    var rePasswordInput = document.getElementById('rePassword');

    nameInput.addEventListener('keyup', () => {
        nameValidation();
    });

    emailInput.addEventListener('keyup', () => {
        emailValidation();
    });

    phoneInput.addEventListener('keyup', () => {
        phoneValidation();
    });

    ageInput.addEventListener('keyup', () => {

        ageValidation();
    });

    passwordInput.addEventListener('keyup', () => {

        passwordValidation();
    });

    rePasswordInput.addEventListener('keyup', () => {
        repaswordValidation();
    });


    function nameValidation() {
    var namealert = document.getElementById('namealert');

    var regex = /^[A-Za-z]{3,6}(\s?[A-Za-z]{3,8})?/;
    if (regex.test(nameInput.value) == true && nameInput.value != "") {
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        namealert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        namealert.classList.replace("d-none", "d-block");
        return false;
    }
    }  
    
    function emailValidation() {
    var emailalert = document.getElementById('emailalert');

    var regex = /@[a-zA-Z]{5,20}(\.com)$/;
    if (regex.test(emailInput.value) == true && emailInput.value != "") {
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
        emailalert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        emailalert.classList.replace("d-none", "d-block");
        return false;
    }
    }
    function ageValidation() {

    var agealert = document.getElementById('agealert');

    var regex = /^[1-8][0-9]|(90)$/;
    if (regex.test(ageInput.value) == true && ageInput.value != "") {
        ageInput.classList.add("is-valid");
        ageInput.classList.remove("is-invalid");
        agealert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        ageInput.classList.add("is-invalid");
        ageInput.classList.remove("is-valid");
        agealert.classList.replace("d-none", "d-block");
        return false;
    }
    }
    function phoneValidation() {

    var phonealert = document.getElementById('phonealert');

    var regex = /^01[0125][0-9]{8}$/;
    if (regex.test(phoneInput.value) == true && phoneInput.value != "") {
        phoneInput.classList.add("is-valid");
        phoneInput.classList.remove("is-invalid");
        phonealert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        phoneInput.classList.add("is-invalid");
        phoneInput.classList.remove("is-valid");
        phonealert.classList.replace("d-none", "d-block");
        return false;
    }

    }

    function passwordValidation() {

    var passwordalert = document.getElementById('passwordalert');

    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
    if (regex.test(passwordInput.value) == true && passwordInput.value != "") {
        passwordInput.classList.add("is-valid");
        passwordInput.classList.remove("is-invalid");
        passwordalert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        passwordInput.classList.add("is-invalid");
        passwordInput.classList.remove("is-valid");
        passwordalert.classList.replace("d-none", "d-block");
        return false;
    }
    }

    function repaswordValidation() {

    var repasswordalert = document.getElementById('repasswordalert');

    if (rePasswordInput.value == passwordInput.value) {
        rePasswordInput.classList.add("is-valid");
        rePasswordInput.classList.remove("is-invalid");
        repasswordalert.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        rePasswordInput.classList.add("is-invalid");
        rePasswordInput.classList.remove("is-valid");
        repasswordalert.classList.replace("d-none", "d-block");
        return false;
    }
    }
}


async function searchByName(name) {

        rowData.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        response = await response.json();

        displayMeals(response.meals);

        console.log(response.meals);
}

async function searchByFLetter(name) {

        rowData.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        response = await response.json();

        displayMeals(response.meals);

        console.log(response.meals);
}

function showSearch(){
    searchContainer.innerHTML =  `
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)"  class="form-control bg-transparent text-white" type="text" placeholder="Search By Name" id="searchByName">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>`
    rowData.innerHTML = ""
}




