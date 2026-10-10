/* =========================================================
   NAVBAR MOBILE
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {
            menuToggle.textContent = "✕";
            menuToggle.setAttribute("aria-label", "Tutup menu");
        } else {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Buka menu");
        }
    });
}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Buka menu");
        }
    });
});


/* =========================================================
   ACTIVE NAVBAR
========================================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", updateActiveNav);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .info-card, .skill-card, .project-card, .timeline-item, .certificate-card, .research-card, .contact-item, .contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   SCROLL TO TOP
========================================================= */

const scrollTopButton = document.getElementById("scroll-top");

function updateScrollTopButton() {
    if (!scrollTopButton) return;

    if (window.scrollY > 400) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }
}

window.addEventListener("scroll", updateScrollTopButton);

if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================================
   CONTACT FORM VALIDATION + WHATSAPP
========================================================= */

const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const formMessage = document.getElementById("form-message");


function showError(input, errorElement, message) {
    input.style.borderColor = "#e989b5";

    if (errorElement) {
        errorElement.textContent = message;
    }
}


function clearError(input, errorElement) {
    input.style.borderColor = "";

    if (errorElement) {
        errorElement.textContent = "";
    }
}


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nama = nameInput.value.trim();
        const email = emailInput.value.trim();
        const pesan = messageInput.value.trim();

        let isValid = true;

        // VALIDASI NAMA
        if (!nama) {
            showError(
                nameInput,
                nameError,
                "Nama wajib diisi."
            );

            isValid = false;
        } else {
            clearError(nameInput, nameError);
        }

        // VALIDASI EMAIL
        if (!email) {
            showError(
                emailInput,
                emailError,
                "Email wajib diisi."
            );

            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(
                emailInput,
                emailError,
                "Masukkan alamat email yang valid."
            );

            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        // VALIDASI PESAN
        if (!pesan) {
            showError(
                messageInput,
                messageError,
                "Pesan wajib diisi."
            );

            isValid = false;
        } else if (pesan.length < 10) {
            showError(
                messageInput,
                messageError,
                "Pesan minimal 10 karakter."
            );

            isValid = false;
        } else {
            clearError(messageInput, messageError);
        }

        // JIKA DATA TIDAK VALID
        if (!isValid) {
            formMessage.textContent =
                "Silakan periksa kembali data yang kamu masukkan.";

            formMessage.style.color = "#e05b86";
            return;
        }

        // NOMOR WHATSAPP TUJUAN
        const nomorWA = "6283174221411";

        // MENYUSUN PESAN
        const teksPesan =
            `Halo, saya ${nama}.\n` +
            `Email: ${email}\n\n` +
            `Pesan:\n${pesan}`;

        // MEMBUAT LINK WHATSAPP
        const linkWA =
            `https://wa.me/${nomorWA}?text=${encodeURIComponent(teksPesan)}`;

        // MEMBUKA WHATSAPP
        const whatsappWindow = window.open(linkWA, "_blank");

        if (whatsappWindow) {
            formMessage.textContent =
                "WhatsApp terbuka. Silakan tekan send untuk mengirim pesan.";

            formMessage.style.color = "#5b8def";
        } else {
            formMessage.textContent =
                "WhatsApp tidak terbuka otomatis. Klik link berikut: ";

            formMessage.style.color = "#e05b86";

            const whatsappLink = document.createElement("a");
            whatsappLink.href = linkWA;
            whatsappLink.target = "_blank";
            whatsappLink.rel = "noopener noreferrer";
            whatsappLink.textContent = "Buka WhatsApp";

            formMessage.appendChild(whatsappLink);
        }
    });
}


/* =========================================================
   REMOVE ERROR WHEN USER TYPES
========================================================= */

if (nameInput) {
    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim() !== "") {
            clearError(nameInput, nameError);
        }
    });
}

if (emailInput) {
    emailInput.addEventListener("input", () => {
        if (emailInput.value.trim() !== "") {
            clearError(emailInput, emailError);
        }
    });
}

if (messageInput) {
    messageInput.addEventListener("input", () => {
        if (messageInput.value.trim().length >= 10) {
            clearError(messageInput, messageError);
        }
    });
}


/* =========================================================
   PROJECT CARD INTERACTION
========================================================= */

const projectLinks = document.querySelectorAll(".project-link");

projectLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (href === "#") {
            event.preventDefault();

            alert(
                "Link project belum diatur. Silakan tambahkan link project Anda."
            );
        }
    });
});


/* =========================================================
   SOCIAL LINK PLACEHOLDER
========================================================= */

const socialLinks = document.querySelectorAll(
    ".hero-social a, .footer-social a"
);

socialLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (href === "#") {
            event.preventDefault();

            alert(
                "Silakan ganti link ini dengan akun media sosial Anda."
            );
        }
    });
});


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    updateActiveNav();
    updateScrollTopButton();
});