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

    let check = true;
    for (let i = 0; i < inputs.length; i++) {
      if (validate(inputs[i]) == false) {
        //showValidate(input[i]);
        console.log("Não é válido")
        check = false;
      }
    }
  });

// const valid = document.querySelector('.validate-form .input100')
// valid.forEach(() => {
//     valid.focus(() => {
//        hideValidate(valid);
//     });
// });

function validate(input) {
  if (input.getAttribute("type") == "email" || input.getAttribute("name") == "email") {
    if (
      input
        .value.trim()
        .match(!/\S+@\S+\.\S+/) == null
    ) {
      return false;
    }
  } else {
    if (input.value.trim() == "") {
      return false;
    }
  }
}

// function showValidate(input) {
//   let thisAlert = document.querySelector(input).parent();

//   document.querySelector(thisAlert).classList.add("alert-validate");
// }

// function hideValidate(input) {
//   let thisAlert = document.querySelector(input).parent();

//   document.querySelector(thisAlert).classList.remove("alert-validate");
// }

let shouldShow = false;
const showBtn = document.querySelector(".btn-show-pass");

showBtn.addEventListener('click', () => {
  if (shouldShow) {
    showBtn.nextElementSibling.setAttribute("type", "password");
    showBtn.querySelector("i").classList.add("mdi-eye");
    document
      // .querySelector(this)
      // .querySelector("i")
      .classList.remove("mdi-eye");
    showPass = 0;
  } else {
    
    showBtn.nextElementSibling.setAttribute("type", "text");
    // showBtn.querySelector("i").classList.remove("mdi-eye");
    // showBtn
    //   .querySelector("i")
    //   .classList.add("mdi-eye-off");
      shouldShow = 1;
  }
});

