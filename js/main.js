/* ============================================================
   MAB Technologies — site behaviour
   - navbar scroll state
   - accessible mobile menu
   - smooth in-page navigation (respects reduced motion)
   - scroll-reveal animations
   - quote form: options, preselection, validation, submit states
   ============================================================ */
(function () {
    "use strict";

    var C = window.MABConfig || {};
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Navbar scroll effect ---------- */
    var navbar = document.getElementById("navbar");
    function onScroll() {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile menu (accessible) ---------- */
    var menu = document.getElementById("mobileMenu");
    var toggle = document.getElementById("mobileToggle");
    var closeBtn = document.getElementById("mobileClose");
    var lastFocused = null;

    function menuOpen() {
        return !!menu && menu.classList.contains("active");
    }

    function setMenu(open) {
        if (!menu || !toggle) return;
        menu.classList.toggle("active", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
        if (open) {
            lastFocused = document.activeElement;
            if (closeBtn) closeBtn.focus();
        } else if (lastFocused && lastFocused.focus) {
            lastFocused.focus();
        }
    }

    // Kept global for backward compatibility with any inline handlers
    window.toggleMobileMenu = function () {
        setMenu(!menuOpen());
    };

    if (toggle) toggle.addEventListener("click", function () { setMenu(!menuOpen()); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });
    if (menu) {
        menu.addEventListener("click", function (e) {
            if (e.target && e.target.tagName === "A") setMenu(false);
        });
    }
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menuOpen()) setMenu(false);
    });

    /* ---------- Smooth scrolling + CTA preselection ---------- */
    function scrollToEl(el) {
        el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
    }

    document.addEventListener("click", function (e) {
        var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
        if (!a) return;
        var raw = a.getAttribute("href") || "";

        // Same-page hash links (e.g. "#services", "#pricing")
        if (raw.charAt(0) === "#" && raw.length > 1) {
            var target = document.querySelector(raw);
            if (target) {
                e.preventDefault();
                if (menuOpen()) setMenu(false);
                history.replaceState(null, "", raw);
                scrollToEl(target);
            }
            return;
        }

        // Package / service CTA links carrying ?preselect= or ?service= … #contact
        if (raw.indexOf("?") !== -1 && raw.indexOf("#contact") !== -1) {
            e.preventDefault();
            if (menuOpen()) setMenu(false);
            var url = new URL(raw, location.href);
            applyParams(url.searchParams);
            history.replaceState(null, "", url.search + url.hash);
            var contact = document.getElementById("contact");
            if (contact) scrollToEl(contact);
        }
    });

    /* ---------- Scroll-reveal animation disabled ----------
       All content is shown immediately (no fade/slide on scroll). The previous
       IntersectionObserver that added an .is-visible class has been removed. */

    /* ---------- Quote form ---------- */
    var form = document.getElementById("quoteForm");
    var serviceSelect = document.getElementById("service");
    var packageSelect = document.getElementById("package");
    var budgetSelect = document.getElementById("budget");
    var contactMethodMount = document.getElementById("contactMethodOptions");
    var statusBox = document.getElementById("formStatus");
    var submitBtn = document.getElementById("quoteSubmit");
    var submitting = false;

    function opt(value, label) {
        var o = document.createElement("option");
        o.value = value;
        o.textContent = label;
        return o;
    }

    // Build select options from config (single source of truth for pricing)
    if (packageSelect) {
        packageSelect.appendChild(opt("", "Select a package (optional)"));
        var pr = C.pricing || {};
        if (pr.starter) {
            packageSelect.appendChild(opt(pr.starter.slug,
                pr.starter.name + " — $" + pr.starter.promoPrice + " (promotional price, was $" + pr.starter.fullPrice + ")"));
        }
        if (pr.business) {
            packageSelect.appendChild(opt(pr.business.slug,
                pr.business.name + " — Starting at $" + pr.business.price));
        }
        if (pr.premium) {
            packageSelect.appendChild(opt(pr.premium.slug,
                pr.premium.name + " — Starting at $" + pr.premium.price));
        }
        var extra = (C.form && C.form.extraPackageOptions) || [
            { slug: "custom-project", label: "Custom Project — Requires quotation" },
            { slug: "not-sure", label: "Not Sure Yet" }
        ];
        extra.forEach(function (x) { packageSelect.appendChild(opt(x.slug, x.label)); });
    }

    if (serviceSelect) {
        var services = (C.form && C.form.serviceOptions) || [];
        serviceSelect.appendChild(opt("", "Select a service"));
        services.forEach(function (s) {
            serviceSelect.appendChild(opt(s.slug, s.label));
        });
    }

    if (budgetSelect) {
        var budgets = (C.form && C.form.budgetOptions) || [];
        budgetSelect.appendChild(opt("", "Select a budget (optional)"));
        budgets.forEach(function (b) { budgetSelect.appendChild(opt(b.slug || b, b.label || b)); });
    }

    if (contactMethodMount) {
        var methods = (C.form && C.form.contactMethodOptions) || [];
        methods.forEach(function (m, i) {
            var id = "contactMethod-" + m.value;
            var label = document.createElement("label");
            label.className = "radio-option";
            label.setAttribute("for", id);
            var input = document.createElement("input");
            input.type = "radio";
            input.name = "contactMethod";
            input.id = id;
            input.value = m.value;
            if (i === 0) input.checked = true;
            label.appendChild(input);
            label.appendChild(document.createTextNode(" " + m.label));
            contactMethodMount.appendChild(label);
        });
    }

    // Apply ?preselect= / ?service= query parameters to the form
    function applyParams(params) {
        if (!params) return;
        var pre = params.get("preselect");
        var svc = params.get("service");
        if (pre && packageSelect) packageSelect.value = pre;
        if (svc && serviceSelect) serviceSelect.value = svc;
    }

    applyParams(new URLSearchParams(location.search));


    /* ---------- Validation ---------- */
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function labelFor(id) {
        var labels = (C.form && C.form.fieldLabels) || {};
        return labels[id] || "This field";
    }

    function fieldError(input, message) {
        var errEl = document.getElementById(input.id + "-error");
        if (message) {
            input.classList.add("invalid");
            input.setAttribute("aria-invalid", "true");
            if (errEl) {
                errEl.textContent = message;
                errEl.hidden = false;
            }
        } else {
            input.classList.remove("invalid");
            input.removeAttribute("aria-invalid");
            if (errEl) {
                errEl.textContent = "";
                errEl.hidden = true;
            }
        }
    }

    function validateField(input) {
        var v = (input.value || "").trim();
        if (input.hasAttribute("required") && !v) {
            fieldError(input, labelFor(input.id) + " is required.");
            return false;
        }
        if (input.type === "email" && v && !EMAIL_RE.test(v)) {
            fieldError(input, "Please enter a valid email address.");
            return false;
        }
        if (input.id === "description" && v && v.length < 10) {
            fieldError(input, "Please add a little more detail (at least 10 characters).");
            return false;
        }
        fieldError(input, "");
        return true;
    }

    function showStatus(type, message) {
        if (!statusBox) return;
        statusBox.hidden = false;
        statusBox.className = "form-status " + type;
        statusBox.textContent = message;
        statusBox.setAttribute("tabindex", "-1");
        statusBox.focus({ preventScroll: false });
    }

    if (form) {
        var watched = form.querySelectorAll("input, select, textarea");
        Array.prototype.forEach.call(watched, function (el) {
            el.addEventListener("blur", function () {
                if (el.value && el.value.trim()) validateField(el);
            });
            el.addEventListener("input", function () {
                if (el.classList.contains("invalid")) validateField(el);
            });
        });
    }


    /* ---------- Submit (honest states — never fake a success) ---------- */
    function setBusy(busy) {
        if (!submitBtn) return;
        submitBtn.disabled = busy;
        submitBtn.classList.toggle("is-loading", busy);
        if (busy) {
            submitBtn.setAttribute("aria-busy", "true");
        } else {
            submitBtn.removeAttribute("aria-busy");
        }
    }

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (submitting) return;

            // Honeypot spam trap — humans never see this field
            var hp = form.querySelector('input[name="website_url"]');
            if (hp && hp.value) {
                showStatus("error", "Your submission could not be accepted. Please try again.");
                return;
            }

            var requiredIds = (C.form && C.form.required) ||
                ["fullName", "email", "service", "description"];
            var firstBad = null;
            requiredIds.forEach(function (id) {
                var el = document.getElementById(id);
                if (el && !validateField(el) && !firstBad) firstBad = el;
            });
            // Validate optional fields only when they contain a value
            ["businessName", "phone", "budget", "package", "description"].forEach(function (id) {
                var el = document.getElementById(id);
                if (el && el.value && el.value.trim()) validateField(el);
            });
            if (firstBad) {
                showStatus("error", "Please correct the highlighted fields and try again.");
                firstBad.focus();
                return;
            }

            var cfg = C.form || {};

            // No backend configured yet — say so honestly, keep the visitor's input
            if (!cfg.actionUrl) {
                showStatus(
                    "warning",
                    cfg.notConfiguredMessage ||
                    "Online enquiries are not enabled yet on this website, so your message has not been sent. Please check back soon or contact MAB Technologies directly."
                );
                return;
            }

            submitting = true;
            setBusy(true);

            var payload = {};
            new FormData(form).forEach(function (value, key) {
                payload[key] = value;
            });
            payload.page = location.pathname;
            payload.timestamp = new Date().toISOString();

            var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
            var timer = controller ? setTimeout(function () { controller.abort(); }, 15000) : null;

            fetch(cfg.actionUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload),
                signal: controller ? controller.signal : undefined
            })
                .then(function (res) {
                    if (!res.ok) throw new Error("Request failed: " + res.status);
                    var fields = form.querySelector(".form-fields");
                    if (fields) fields.hidden = true;
                    showStatus("success", cfg.successMessage || "Thank you — your enquiry has been sent.");
                    form.reset();
                })
                .catch(function () {
                    showStatus(
                        "error",
                        cfg.errorMessage ||
                        "There was a problem sending your enquiry. Your details are still here — please try again."
                    );
                })
                .then(function () {
                    if (timer) clearTimeout(timer);
                    submitting = false;
                    setBusy(false);
                });
        });
    }
})();
