/*==================================================
    PORTFOLIO QUICK INQUIRY
==================================================*/

(() => {

    "use strict";

    /*==========================================
    ELEMENT
    ==========================================*/

    const form = document.getElementById("quickInquiryForm");

    if (!form) return;

    const submitBtn = document.getElementById("cqSubmit");
    const btnText = submitBtn.querySelector(".cq-btn-text");

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const successPopup = document.getElementById("cqSuccess");
    const errorPopup = document.getElementById("cqError");

    const successClose = document.getElementById("cqSuccessClose");
    const errorClose = document.getElementById("cqErrorClose");

    const errorText = document.getElementById("cqErrorMessage");

    /*==========================================
    ALERT
    ==========================================*/

    function hideSuccess() {

        if (successPopup) {

            successPopup.classList.remove("active");

        }

    }

    function hideError() {

        if (errorPopup) {

            errorPopup.classList.remove("active");

        }

    }

    function showSuccess() {

        hideError();

        if (successPopup) {

            successPopup.classList.add("active");

            successPopup.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }

    }

    function showError(text = "Something went wrong.") {

        hideSuccess();

        if (errorText) {

            errorText.textContent = text;

        }

        if (errorPopup) {

            errorPopup.classList.add("active");

            errorPopup.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }

    }

    /*==========================================
    CLOSE ALERT
    ==========================================*/

    if (successClose) {

        successClose.addEventListener("click", hideSuccess);

    }

    if (errorClose) {

        errorClose.addEventListener("click", hideError);

    }

    /*==========================================
    VALIDATION
    ==========================================*/

    function validate(data) {

        if (data.fullname.length < 3) {

            showError("Please enter your full name.");
            fullname.focus();
            return false;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {

            showError("Please enter a valid email address.");
            email.focus();
            return false;

        }

        if (data.message.length < 10) {

            showError("Please write at least 10 characters.");
            message.focus();
            return false;

        }

        return true;

    }

    /*==========================================
    LOADING
    ==========================================*/

    function loading(state) {

        submitBtn.disabled = state;

        submitBtn.classList.toggle("loading", state);

        btnText.textContent = state
            ? "Sending..."
            : "Send Now";

    }

    /*==========================================
    SUBMIT
    ==========================================*/

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        hideSuccess();
        hideError();

        const data = {

            fullname: fullname.value.trim(),
            email: email.value.trim(),
            message: message.value.trim()

        };

        if (!validate(data)) {

            return;

        }

        /*======================================
        CHECK SUPABASE
        ======================================*/

        if (!window.supabaseClient) {

            console.error("Supabase Client Not Found");

            showError(
                "Database connection failed."
            );

            return;

        }

        loading(true);

        try {

            /*======================================
            INSERT
            ======================================*/

            const {

                data: result,
                error

            } = await window.supabaseClient

                .from("quick_inquiries")

                .insert([
                    {
                        fullname: data.fullname,
                        email: data.email,
                        message: data.message
                    }
                ])

                .select();

            if (error) {

                throw error;

            }

            console.log(
                "Inquiry Saved:",
                result
            );

            form.reset();

            showSuccess();

        }

        catch (err) {

            console.error(
                "Quick Inquiry Error:",
                err
            );

            showError(

                err?.message ||

                "Failed to send your inquiry. Please try again."

            );

        }

        finally {

            loading(false);

        }

    });

})();