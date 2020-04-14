const main = document.getElementById("main");
const addUserBtn = document.getElementById("btnAddUser");
const doubleBtn = document.getElementById("btnDoubleMoney");
const showMillionairesBtn = document.getElementById("btnShowMilionaires");
const sortBtn = document.getElementById("btnSort");
const calculateWealthBtn = document.getElementById("btnCalculateWealth");

let arr = [];
getRandomUser();
//fetch random user + add money to him
async function getRandomUser() {
  const resp = await fetch("https://randomuser.me/api");
  const data = await resp.json();
  const user = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(user);
}

function addData(user) {
  arr.push(user);
  updateDOM();
}

function updateDOM(providedData = arr) {
  main.innerHTML = "<h2><span>Person</span> Wealth</h2>";
  providedData.forEach(user => {
    const el = document.createElement("div");
    el.classList.add("person");
    el.innerHTML = `<span>${user.name}</span> ${formatMoney(user.money)}`;
    main.appendChild(el);
  });
}

function doubleMoney() {
  arr = arr.map(user => {
    return Object.assign({}, user, {money: user.money * 2})
  })
  updateDOM()
}

function sortByRichest() {
  arr = arr.sort((a,b) => b.money - a.money);
  updateDOM()
}

function showMillionaires() {
  arr = arr.filter(user => user.money > 999999);
  updateDOM()
}

function calculateWealth() {
  const totalWealth = arr.reduce((acc,curr) => acc + curr.money,0);
  const totalWealthEl = document.createElement('h3');
  totalWealthEl.innerHTML = `<span>Total wealth:</span> ${formatMoney(totalWealth)}`;
  main.appendChild(totalWealthEl)
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
