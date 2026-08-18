let userImageData = "";

document.addEventListener("DOMContentLoaded", function () {
    let photoInput = document.getElementById("photo");
    if (photoInput) {
        photoInput.onchange = function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    userImageData = e.target.result;
                    document.getElementById("preview").src = userImageData;
                    document.getElementById("preview").style.display = "block";
                    document.getElementById("plus").style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        };
    }

    let birthInput = document.getElementById("birth");
    if (birthInput) {
        birthInput.onchange = function () {
            let d = new Date(this.value);
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let zodiac = "";

            if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiac = "الحمل";
            else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiac = "الثور";
            else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiac = "الجوزاء";
            else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiac = "السرطان";
            else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiac = "الأسد";
            else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiac = "العذراء";
            else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiac = "الميزان";
            else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiac = "العقرب";
            else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiac = "القوس";
            else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) zodiac = "الجدي";
            else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiac = "الدلو";
            else zodiac = "الحوت";

            document.getElementById("zodiac").value = zodiac;
        };
    }

    let registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.onsubmit = function (e) {
            e.preventDefault();

            let name = document.getElementById("fullnameInput").value.trim();
            let email = document.getElementById("emailInput").value.trim();
            let pass = document.getElementById("passInput").value;
            let passConfirm = document.getElementById("passConfirmInput").value;

            if (!userImageData) { alert("الرجاء اختيار صورة شخصية"); return; }
            if (!name) { alert("الرجاء إدخال الاسم الثلاثي"); return; }
            if (!email) { alert("الرجاء إدخال البريد الإلكتروني"); return; }
            if (pass !== passConfirm || !pass) { alert("كلمات المرور غير متطابقة"); return; }

            localStorage.setItem("userAvatar", userImageData);
            localStorage.setItem("fullname", name);
            localStorage.setItem("email", email);
            localStorage.setItem("password", pass);
            localStorage.setItem("birth", document.getElementById("birth").value);
            localStorage.setItem("zodiac", document.getElementById("zodiac").value);
            localStorage.setItem("social", document.getElementById("social").value);
            localStorage.setItem("gender", document.getElementById("gender").value);
            localStorage.setItem("ezidiClass", document.getElementById("ezidiClass").value);
            localStorage.setItem("country", document.getElementById("country").value);
            localStorage.setItem("region", document.getElementById("region").value);
            localStorage.setItem("job", document.getElementById("job").value);
            localStorage.setItem("level", document.getElementById("level").value);

            let selectedLangs = Array.from(document.querySelectorAll('input[name="lang"]:checked')).map(cb => cb.value);
            localStorage.setItem("language", selectedLangs.join(", "));

            localStorage.setItem("isLoggedIn", "true");
            window.location.replace("home.html");
        };
    }
});
