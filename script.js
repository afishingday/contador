const database = firebase.database();

let currentLanguage = "es";
let contador1 = 0;
let contador2 = 0;
let registroDias = [
  { fecha: "06/01/2023", contador1: 5, contador2: 2 },
  { fecha: "06/02/2023", contador1: 3, contador2: 1 },
  { fecha: "06/03/2023", contador1: 4, contador2: 0 },
  { fecha: "06/04/2023", contador1: 8, contador2: 3 },
  { fecha: "06/05/2023", contador1: 2, contador2: 1 }
];

function init() {
  updateLanguage();
  showRegistroDias();
  updateTotals();
  document.getElementById("counter1").textContent = contador1;
  document.getElementById("counter2").textContent = contador2;
}

function updateLanguage() {
  const question1 = document.getElementById("question1");
  const question2 = document.getElementById("question2");
  const yesBtn1 = document.getElementById("yesBtn1");
  const yesBtn2 = document.getElementById("yesBtn2");
  const registroTitle = document.getElementById("registro-title");

  switch (currentLanguage) {
    case "es":
      question1.textContent = "¿VOLVIÓ A DECIR ALGO ESTÚPIDO?";
      question2.textContent = "¿PATEÓ EL CLOSET?";
      yesBtn1.textContent = "SÍ";
      yesBtn2.textContent = "SÍ";
      registroTitle.textContent = "Registros de días anteriores";
      break;
    case "en":
      question1.textContent = "Did he say something stupid again?";
      question2.textContent = "Did he kick the closet?";
      yesBtn1.textContent = "YES";
      yesBtn2.textContent = "YES";
      registroTitle.textContent = "Previous Days' Records";
      break;
    case "tlh":
      question1.textContent = "vItlhutlh 'e' luqorbe' lu?";
      question2.textContent = "Qej Hochvam QeylIS QIch?";
      yesBtn1.textContent = "HIq";
      yesBtn2.textContent = "HIq";
      registroTitle.textContent = "latlh tlhIngan Hutlhvetlh";
      break;
    case "elv":
      question1.textContent = "Ae lye istë túle sina tenna?";
      question2.textContent = "Ae lye ilya órë sernë?";
      yesBtn1.textContent = "NÁ";
      yesBtn2.textContent = "NÁ";
      registroTitle.textContent = "I cénedan i darë i apsenë";
      break;
    case "val":
      question1.textContent = "Kesys se teptas ñuha vēzen?";
      question2.textContent = "Kesys se āeksio jaelon?";
      yesBtn1.textContent = "SE";
      yesBtn2.textContent = "SE";
      registroTitle.textContent = "Nyke Zȳhon Ūndon";
      break;
    default:
      question1.textContent = "¿VOLVIÓ A DECIR ALGO ESTÚPIDO?";
      question2.textContent = "¿PATEÓ EL CLOSET?";
      yesBtn1.textContent = "SÍ";
      yesBtn2.textContent = "SÍ";
      registroTitle.textContent = "Registros de días anteriores";
      break;
  }
}

function changeLanguage() {
  const languageSelect = document.getElementById("language-select");
  currentLanguage = languageSelect.value;
  updateLanguage();
  updateTotals();
}

function incrementCounter1() {
  contador1++;
  document.getElementById("counter1").textContent = contador1;
  saveRegistroDia();
  updateTotals();
}

function incrementCounter2() {
  contador2++;
  document.getElementById("counter2").textContent = contador2;
  saveRegistroDia();
  updateTotals();
}

function saveRegistroDia() {
  const fecha = getCurrentDate();
  let registroDia = registroDias.find(registro => registro.fecha === fecha);

  if (registroDia) {
    registroDia.contador1 = contador1;
    registroDia.contador2 = contador2;
  } else {
    registroDia = { fecha, contador1, contador2 };
    registroDias.push(registroDia);
  }

  showRegistroDias();
}

function getCurrentDate() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  return `${padNumber(month)}/${padNumber(day)}/${currentDate.getFullYear()}`;
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function showRegistroDias() {
  const registroColumn1 = document.getElementById("registro-column1");
  const registroColumn2 = document.getElementById("registro-column2");
  registroColumn1.innerHTML = "";
  registroColumn2.innerHTML = "";

  for (let i = registroDias.length - 1; i >= 0; i--) {
    const registro = registroDias[i];
    const fecha = registro.fecha;
    const contador1 = registro.contador1;
    const contador2 = registro.contador2;

    const li1 = document.createElement("li");
    const li2 = document.createElement("li");

    li1.textContent = `${fecha}: ${contador1}`;
    li2.textContent = `${fecha}: ${contador2}`;

    registroColumn1.appendChild(li1);
    registroColumn2.appendChild(li2);
  }
}

function updateTotals() {
  const currentMonth = new Date().getMonth() + 1;
  let totalMonth1 = 0;
  let totalMonth2 = 0;
  let totalYear1 = 0;
  let totalYear2 = 0;

  registroDias.forEach(registro => {
    const registroMonth = parseInt(registro.fecha.split("/")[0]);

    if (registroMonth === currentMonth) {
      totalMonth1 += registro.contador1;
      totalMonth2 += registro.contador2;
    }

    totalYear1 += registro.contador1;
    totalYear2 += registro.contador2;
  });

  const totalMonth1Element = document.getElementById("totalMonth1");
  totalMonth1Element.style.display = "none";

  const totalMonth2Element = document.getElementById("totalMonth2");
  totalMonth2Element.style.display = "none";

  const totalYear1Element = document.getElementById("totalYear1");
  totalYear1Element.style.display = "none";

  const totalYear2Element = document.getElementById("totalYear2");
  totalYear2Element.style.display = "none";
}

init();
