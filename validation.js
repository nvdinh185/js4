function Validator(options) {
    var formElement = document.querySelector(options.form);
    if (formElement) {

        options.rules.forEach(function (rule) {

            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    var errorElement = inputElement.parentElement.querySelector(".form-message");
                    var errorMsg = rule.test(inputElement.value);
                    if (errorMsg) {
                        errorElement.innerText = errorMsg;
                        inputElement.parentElement.querySelector(".form-control").classList.add('invalid');
                    } else {
                        errorElement.innerText = "";
                        inputElement.parentElement.querySelector(".form-control").classList.remove('invalid');
                    }
                }
            }
        })
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : "Yêu cầu nhập!";
        }
    }
}