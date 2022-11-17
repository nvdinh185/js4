
// Đối tượng `Validator`
function Validator(options) {

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMsg = rule.test(inputElement.value);
        if (errorMsg) {
            errorElement.innerText = errorMsg;
            inputElement.parentElement.querySelector(".form-control").classList.add('invalid');
        } else {
            errorElement.innerText = "";
            inputElement.parentElement.querySelector(".form-control").classList.remove('invalid');
        }
    }

    // Lấy element của form cần validate
    formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = document.querySelector(rule.selector);
            if (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    inputElement.parentElement.querySelector(".form-control").classList.remove('invalid');
                }
            }
        })
    }
}

// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => trả ra message lỗi
// 2. Khi hợp lệ => không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, msg) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : msg || "Vui lòng nhập trường này!";
        }
    };
}

Validator.isEmail = function (selector, msg) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : msg || "Trường này phải là email";
        }
    };
}

Validator.minLength = function (selector, min, msg) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : msg || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, msg) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : msg || 'Giá trị nhập vào không chính xác';
        }
    };
}