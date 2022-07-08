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

// const input = document.querySelectorAll(
//   ".validate-input .input100 .validate-form"
// );
// input.forEach(function (input) {
//   input.addEventListener('submit', () => {
//     let check = true;
//     for (let i = 0; i < input.length; i++) {
//       if (validate(input[i]) == false) {
//         showValidate(input[i]);
//         check = false;
//       }
//     }
//   });

//   return check;
// });

// const valid = document.querySelector('.validate-form .input100')
// valid.forEach(() => {
//     valid.focus(() => {
//        hideValidate(valid);
//     });
// });

// function validate(input) {
//   if (
//     document.querySelector(input).attr("type") == "email" ||
//     document.querySelector(input).attr("name") == "email"
//   ) {
//     if (
//       document
//         .querySelector(input)
//         .value.trim()
//         .match(!/\S+@\S+\.\S+/) == null
//     ) {
//       return false;
//     }
//   } else {
//     if (document.querySelector(input).value.trim() == "") {
//       return false;
//     }
//   }
// }

// function showValidate(input) {
//   let thisAlert = document.querySelector(input).parent();

//   document.querySelector(thisAlert).classList.add("alert-validate");
// }

// function hideValidate(input) {
//   let thisAlert = document.querySelector(input).parent();

//   document.querySelector(thisAlert).classList.remove("alert-validate");
// }

let showPass = 0;
const show = document.querySelector(".btn-show-pass");

show.addEventListener("onClick", () => {
  if (showPass == 0) {
    document.querySelector(this).next("input").attr("type", "text");
    document.querySelector(this).querySelector("i").classList.remove("mdi-eye");
    document.querySelector(this).querySelector("i").classList.add("mdi-eye-off");
    showPass = 1;
  } else {
    document.querySelector(this).next("input").attr("type", "password");
    document.querySelector(this).querySelector("i").classList.add("mdi-eye");
    document.querySelector(this).querySelector("i").classList.remove("mdi-eye-off");
    showPass = 0;
  }
});
