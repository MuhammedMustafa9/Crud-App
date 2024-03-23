var pName = document.getElementById("pName");
var pCategory = document.getElementById("pCategory");
var pPrice = document.getElementById("pPrice");
var pName = document.getElementById("pName");
var pDesc = document.getElementById("pDesc");
var submitBtn = document.getElementById("submitBtn");
var resetBtn = document.getElementById("resetBtn");
var search = document.getElementById("search");
var tbody = document.getElementById("tbody");
var productList = [];

(function () {
  if (localStorage.getItem("productList") != null) {
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
  }
})();

submitBtn.addEventListener("click", function () {
  if (submitBtn.classList.contains("btn-outline-primary")) {
    addProduct();
  }
});

resetBtn.addEventListener("click", reset);

search.addEventListener("keyup", searchProducts);
// Add Products
function addProduct() {
  var product = {
    name: pName.value,
    categ: pCategory.value,
    price: pPrice.value,
    desc: pDesc.value,
  };
  if (!validateName() && !validatePrice() && !validateCateg()) {
    console.log("ok");
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList);
    reset();
  }
}

// Show Products
function displayProduct(productList) {
  var cartoona = "";
  tbody.innerHTML = "";
  for (var i = 0; i < productList.length; i++) {
    cartoona += `
        <tr class="mb-5">
        <td class="col">${i + 1}</td>
        <td class="col">${productList[i].name}</td>
        <td class="col">${productList[i].categ}</td>
        <td class="col">${productList[i].price}</td>
        <td class="col">${productList[i].desc}</td>
        <td class="col"> <button onclick="editProduct(${i})" class="btn btn-success px-3 py-2">
        <i class="fa-solid fa-edit"></i>
       </button></td>
        <td class="col"><button onclick="removeProduct(${i})" class="btn btn-warning px-3 py-2">
        <i class="fa-solid fa-trash"></i>
       </button></td>
      </tr>
        `;
    tbody.innerHTML = cartoona;
  }
}

// Resrt Form
function reset() {
  pName.value = "";
  pCategory.value = "";
  pPrice.value = "";
  pDesc.value = "";
  if (submitBtn.classList.contains("btn-outline-success")) {
    submitBtn.classList.replace("btn-outline-success", "btn-outline-primary");
    submitBtn.innerHTML = "Add";
  }
}

// Edit Products
function editProduct(i) {
  pName.value = productList[i].name;
  pCategory.value = productList[i].categ;
  pPrice.value = productList[i].price;
  pDesc.value = productList[i].desc;

  submitBtn.classList.replace("btn-outline-primary", "btn-outline-success");

  submitBtn.innerHTML = "Edit";

  submitBtn.addEventListener("click", function () {
    productList[i].name = pName.value;
    productList[i].categ = pCategory.value;
    productList[i].price = pPrice.value;
    productList[i].desc = pDesc.value;

    localStorage.setItem("productList", JSON.stringify(productList));

    reset();

    displayProduct(productList);
    submitBtn.classList.replace("btn-outline-success", "btn-outline-primary");
    submitBtn.innerHTML = "Add";
  });
}

// Remove Products
function removeProduct(i) {
  productList.splice(i, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct(productList);
}

// Search Products
function searchProducts() {
  tbody.innerHTML = "";
  var cartoona = "";

  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.includes(search.value.trim()) == true) {
      cartoona += `
        <tr class="mb-5">
        <td class="col">${i + 1}</td>
        <td class="col">${productList[i].name}</td>
        <td class="col">${productList[i].categ}</td>
        <td class="col">${productList[i].price}</td>
        <td class="col">${productList[i].desc}</td>
        <td class="col"> <button onclick="editProduct(${i})" class="btn btn-success px-3 py-2">
        <i class="fa-solid fa-edit"></i>
       </button></td>
        <td class="col"><button onclick="removeProduct(${i})" class="btn btn-warning px-3 py-2">
        <i class="fa-solid fa-trash"></i>
       </button></td>
      </tr>
        `;
    } else if (search.value == "") {
      cartoona = "";
      cartoona += `
        <tr class="mb-5">
        <td class="col">${i + 1}</td>
        <td class="col">${productList[i].name}</td>
        <td class="col">${productList[i].categ}</td>
        <td class="col">${productList[i].price}</td>
        <td class="col">${productList[i].desc}</td>
        <td class="col"> <button onclick="editProduct(${i})" class="btn btn-success px-3 py-2">
        <i class="fa-solid fa-edit"></i>
       </button></td>
        <td class="col"><button onclick="removeProduct(${i})" class="btn btn-warning px-3 py-2">
        <i class="fa-solid fa-trash"></i>
       </button></td>
      </tr>
        `;
    }
  }
  tbody.innerHTML = cartoona;
}

// regExp Validtions
function validateName() {
  var regex = /^[A-Z][a-zA-Z]{3,10}$/;
  if (!regex.test(pName.value)) {
    document.querySelector(".name-error").classList.remove("d-none");
    document.querySelector(".name-error").innerHTML =
      "Name should start with capetial letters and length between 3 to 10.";
    return true;
  } else {
    document.querySelector(".name-error").classList.add("d-none");
    document.querySelector(".name-error").innerHTML = "";
  }
}

function validateCateg() {
  var regex = /^[a-zA-Z]{3,10}$/;
  if (!regex.test(pCategory.value)) {
    document.querySelector(".categ-error").classList.remove("d-none");
    document.querySelector(".categ-error").innerHTML =
      "Category length should be between 3 to 10.";
    return true;
  } else {
    document.querySelector(".categ-error").classList.add("d-none");
    document.querySelector(".categ-error").innerHTML = "";
  }
}

function validatePrice() {
  var regex = /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/;
  if (!regex.test(pPrice.value)) {
    document.querySelector(".price-error").classList.remove("d-none");
    document.querySelector(".price-error").innerHTML =
      "price should in format 100.00";
    return true;
  } else {
    document.querySelector(".price-error").classList.add("d-none");
    document.querySelector(".price-error").innerHTML = "";
  }
}
