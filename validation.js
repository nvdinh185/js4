function Validator(options) {
    var formElement = document.querySelector(options.form);
    if (formElement) {

        var selectorRules = {};
        options.rules.forEach(function (rule) {

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    var errorMsg;
                    var rules = selectorRules[rule.selector];
                    for (let i = 0; i < rules.length; i++) {
                        errorMsg = rules[i](inputElement.value);
                        if (errorMsg) break;
                    }
                    var errorElement = inputElement.parentElement.querySelector(".form-message");
                    if (errorMsg) {
                        errorElement.innerText = errorMsg;
                    } else {
                        errorElement.innerText = '';
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

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Trường này phải là email";
        }
    }
}

// ========================================================================================

// function Validator2(options) {
//     console.log(options);
// }

// Validator2.myMethod = function () {
//     console.log(123);
//     return {
//         a: 123
//     };
// }