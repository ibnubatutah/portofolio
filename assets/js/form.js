/*==================================================
    CROWNSY QUICK INQUIRY
==================================================*/

(() => {

    "use strict";

    /*==========================================
    ELEMENT
    ==========================================*/

    const modal = document.getElementById("cqModal");

    if (!modal) return;

    const openBtn = document.getElementById("cqOpenModal");
    const closeBtn = document.getElementById("cqCloseModal");
    const overlay = modal.querySelector(".cq-overlay");

    const form = document.getElementById("quickInquiryForm");

    if (!form) return;

    const submitBtn = document.getElementById("cqSubmit");

    const successPopup = document.getElementById("cqSuccess");
    const errorPopup = document.getElementById("cqError");

    const successClose = document.getElementById("cqSuccessClose");
    const errorClose = document.getElementById("cqErrorClose");

    const errorText = document.getElementById("cqErrorMessage");

    /*==========================================
    OPEN
    ==========================================*/

    function openModal() {

        modal.classList.add("active");
        document.body.classList.add("cq-lock");

    }

    /*==========================================
    CLOSE
    ==========================================*/

    function closeModal() {

        modal.classList.remove("active");
        document.body.classList.remove("cq-lock");

    }

    /*==========================================
    RESULT
    ==========================================*/

    function showSuccess() {

        successPopup.classList.add("active");

    }

    function hideSuccess() {

        successPopup.classList.remove("active");

    }

    function showError(message = "Something went wrong.") {

        errorText.textContent = message;
        errorPopup.classList.add("active");

    }

    function hideError() {

        errorPopup.classList.remove("active");

    }

    /*==========================================
    EVENT
    ==========================================*/

    if (openBtn) {

        openBtn.addEventListener("click", openModal);

    }

    if (closeBtn) {

        closeBtn.addEventListener("click", closeModal);

    }

    if (overlay) {

        overlay.addEventListener("click", closeModal);

    }

    if (successClose) {

        successClose.addEventListener("click", hideSuccess);

    }

    if (errorClose) {

        errorClose.addEventListener("click", hideError);

    }

    /*==========================================
    ESC
    ==========================================*/

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeModal();
            hideSuccess();
            hideError();

        }

    });

    /*==========================================
    CLICK OUTSIDE
    ==========================================*/

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            closeModal();

        }

    });

    /*==========================================
    VALIDATION
    ==========================================*/

    function validate(data) {

        if (data.fullname.length < 3) {

            showError("Please enter your full name.");
            return false;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(data.email)) {

            showError("Please enter a valid email address.");
            return false;

        }

        if (data.message.length < 10) {

            showError("Please write at least 10 characters.");
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

        if (state) {

            submitBtn.textContent = "Sending...";

        } else {

            submitBtn.textContent = "Submit";

        }

    }

    /*==========================================
    SUBMIT
    ==========================================*/

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const data = {

            fullname: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()

        };

        if (!validate(data)) return;

        /*======================================
        CHECK CONNECTION
        ======================================*/

        if (!window.supabaseClient) {

            console.error("Supabase Client Not Found");

            showError("Database connection failed.");

            return;

        }

        loading(true);

        try {

            /*======================================
            SUPABASE INSERT
            ======================================*/

            const { data: result, error } = await window.supabaseClient
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

            console.log("Inquiry Saved:", result);

            form.reset();

            closeModal();

            showSuccess();

        } catch (err) {

            console.error("Quick Inquiry Error:", err);

            showError(
                err?.message ||
                "Failed to save inquiry. Please try again."
            );

        } finally {

            loading(false);

        }

    });

})();