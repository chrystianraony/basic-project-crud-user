
loadJS('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');
loadJS('https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.4.17/sweetalert2.all.js')
loadJS('https://cdn.jsdelivr.net/npm/flatpickr')
loadJS('https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js')

const inputs = document.querySelectorAll(".input100");

inputs.forEach(function (input) {
  input.addEventListener("blur", () => {
    if (input.value.trim() != "") {
      input.classList.add("has-val");
    } else {
      input.classList.remove("has-val");
    }
  });
});

const submit = document.querySelector(".login100-form-btn");

submit.addEventListener('click', (event) => {
    event.preventDefault();

    let errorParagraph = document.querySelector("p.error")
    errorParagraph?.remove()

    let check = true;
    for (let i = 0; i < inputs.length; i++) {
      if (validate(inputs[i]) == false) {
        //showError(input[i]);
        check = false;
      }
    }

    if (check) {
      let inputEmail = document.getElementById('email')
      let inputPassword = document.getElementById('password')

      let data = {
        email: inputEmail.value.trim(),
        senha: inputPassword.value.trim()
      }

      
        axios.post("http://localhost:8080/auth/signin", data)
        .then(function (response) {
          window.location.href = "/users"
          // TODO: SETAR TOKEN DE SESSAO / COOKIE
        }).catch((error) => {
          let divFormButton = document.querySelector(".container-login100-form-btn")
        
          let p = document.createElement("p")
          p.classList.add("error")
          p.innerText = "Credenciais inválidas, tente novamente."

          divFormButton.prepend(p)
        })      
        
    }
  });


//VALIDANDO EMAIL 
function validate(input) {
  if (input.getAttribute("type") == "email" || input.getAttribute("name") == "email") {
    if (
      input.value.trim().match(/\S+@\S+\.\S+/) == null
    ) {
      return false;
    }
  } else {
    if (input.value.trim() == "") {
      return false;
    }
  }

  return true
}


// function showValidate(input) {
//   let thisAlert = document.querySelector(input).parent();

//   document.querySelector(thisAlert).classList.add('alert-validate');
// }

// function hideValidate(input) {
//   let thisAlert = document.querySelector(input).parent();

//   document.querySelector(thisAlert).classList.remove('alert-validate');
// }


//INTERAGINDO COM A SENHA
let shouldShow = false;
const showBtn = document.querySelector(".btn-show-pass");

showBtn.addEventListener('click', () => {
  if (shouldShow) {
    showBtn.nextElementSibling.setAttribute("type", "password");
    showBtn.querySelector("i.test").classList.remove("mdi-eye-off");
    document
      // .querySelector(this)
      .querySelector("i.test")
      .classList.add("mdi-eye");
    shouldShow = false;
  } else {
    
    showBtn.nextElementSibling.setAttribute("type", "text");
    showBtn.querySelector("i").classList.remove("mdi-eye");
    document
    .querySelector("i.test")
    .classList.add("mdi-eye-off");
      shouldShow = true;
  }
});

