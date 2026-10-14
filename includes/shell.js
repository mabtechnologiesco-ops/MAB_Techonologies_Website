/* ============================================================
   MAB Technologies — shared header / footer / widget renderer
   Reads window.MABConfig from includes/_config.js
   Edit _config.js to change company details in one place.
   ============================================================ */
(function () {
    "use strict";

    var C = window.MABConfig || {};

    // Gate reveal animations on JS availability so content is visible without it
    document.documentElement.classList.add("js");

    function esc(s) {
        return String(s === null || s === undefined ? "" : s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function pageFile() {
        var p = location.pathname.split("/").pop();
        return p || "index.html";
    }

    function isHome() {
        var p = pageFile();
        return p === "index.html" || p === "";
    }

    // "#services" -> "#services" on the homepage, "index.html#services" elsewhere
    function href(hash) {
        if (!hash || hash.charAt(0) !== "#") return hash || "#";
        return isHome() ? hash : "index.html" + hash;
    }

    function homeHref() {
        return isHome() ? "#home" : "index.html";
    }

    var LOGO_SRC = "images/mab-logo.png";

    function logoLink(cls) {
        return '<a href="' + esc(homeHref()) + '" class="' + cls + '" aria-label="MAB Technologies — home">' +
            '<img src="' + LOGO_SRC + '" alt="MAB Technologies" width="720" height="292" class="logo-img">' +
            "</a>";
    }

    var ICONS = {
        pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
    };

    /* ---------- Header + mobile menu ---------- */
    function renderHeader() {
        var mount = document.getElementById("header-mount");
        if (!mount) return;

        var links = (C.nav || []).map(function (n) {
            return '<a href="' + esc(href(n.href)) + '">' + esc(n.label) + "</a>";
        }).join("");

        var cta = C.ctaLink || { href: "#contact", label: "Request a Quote" };
        var ctaHref = href(cta.href);

        mount.innerHTML =
            '<nav class="navbar" id="navbar" aria-label="Main navigation">' +
                '<div class="container">' +
                    logoLink("navbar-logo") +
                    '<div class="navbar-menu">' + links + "</div>" +
                    '<div class="navbar-actions">' +
                        '<a class="btn btn-primary navbar-cta" href="' + esc(ctaHref) + '">' + esc(cta.label) + "</a>" +
                    "</div>" +
                    '<button type="button" class="mobile-toggle" id="mobileToggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileMenu">' +
                        "<span></span><span></span><span></span>" +
                    "</button>" +
                "</div>" +
            "</nav>" +
            '<div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Navigation menu">' +
                '<button type="button" class="close-btn" id="mobileClose" aria-label="Close navigation menu">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
                "</button>" +
                logoLink("navbar-logo mobile-logo") +
                links +
                '<a class="btn btn-primary" href="' + esc(ctaHref) + '">' + esc(cta.label) + "</a>" +
            "</div>";
    }

    /* ---------- Footer ---------- */
    function telHref(v) {
        return "tel:" + String(v || "").replace(/[^+0-9]/g, "");
    }

    function renderFooter() {
        var mount = document.getElementById("footer-mount");
        if (!mount) return;

        var ct = C.contact || {};
        var year = new Date().getFullYear();

        var quick = (C.nav || []).map(function (n) {
            return '<li><a href="' + esc(href(n.href)) + '">' + esc(n.label) + "</a></li>";
        }).join("");

        var svcLinks = (C.services || []).map(function (s) {
            return '<li><a href="' + esc(href("#services")) + '">' + esc(s.title) + "</a></li>";
        }).join("");

        var rows = [];
        if (ct.location) {
            rows.push('<li><a href="' + esc(href("#contact")) + '">' + ICONS.pin + "<span>" + esc(ct.location) + "</span></a></li>");
        }
        if (ct.email) {
            rows.push('<li><a href="mailto:' + esc(ct.email) + '">' + ICONS.mail + "<span>" + esc(ct.email) + "</span></a></li>");
        }
        if (ct.phone) {
            rows.push('<li><a href="' + esc(telHref(ct.phone)) + '">' + ICONS.phone + "<span>" + esc(ct.phone) + "</span></a></li>");
        }
        if (ct.whatsapp) {
            rows.push('<li><a href="' + esc(telHref(ct.whatsapp)) + '">' + ICONS.chat + "<span>WhatsApp: " + esc(ct.whatsapp) + "</span></a></li>");
        }
        rows.push('<li><a href="' + esc(href("#pricing")) + '">' + ICONS.mail + "<span>Website Packages &amp; Pricing</span></a></li>");

        // Only render social icons when genuine profile URLs are configured
        var socials = (C.social || []).filter(function (s) {
            return s.url && s.url !== "#";
        }).map(function (s) {
            return '<a href="' + esc(s.url) + '" aria-label="' + esc(s.label) + '" rel="noopener noreferrer" target="_blank">' +
                '<span class="social-text">' + esc(s.label.charAt(0)) + "</span></a>";
        }).join("");

        var tagline = (C.brand && C.brand.tagline) || "";

        mount.innerHTML =
            '<footer class="footer">' +
                '<div class="container">' +
                    '<div class="footer-grid">' +
                        '<div class="footer-brand">' +
                            '<a href="' + esc(homeHref()) + '" class="footer-logo" aria-label="MAB Technologies — home">' +
                                '<img src="' + LOGO_SRC + '" alt="MAB Technologies" width="720" height="292" class="logo-img">' +
                            "</a>" +
                            '<p class="footer-tagline">' + esc(tagline) + "</p>" +
                            "<p>MAB Technologies builds professional websites, custom software applications, and AI-powered automation solutions that help businesses work smarter and grow.</p>" +
                            (socials ? '<div class="footer-social">' + socials + "</div>" : "") +
                        "</div>" +
                        '<div class="footer-col"><h4>Quick Links</h4><ul>' + quick + "</ul></div>" +
                        '<div class="footer-col"><h4>Services</h4><ul>' + svcLinks + "</ul></div>" +
                        '<div class="footer-col"><h4>Contact</h4><ul class="footer-contact">' + rows.join("") + "</ul></div>" +
                    "</div>" +
                    '<div class="footer-bottom">' +
                        "<p>&copy; " + year + " MAB Technologies. All rights reserved.</p>" +
                        '<div class="footer-bottom-links">' +
                            '<a href="' + esc(href("#pricing")) + '">Website Pricing</a>' +
                            '<a href="' + esc(href("#projects")) + '">Projects</a>' +
                            '<a href="' + esc(href("#contact")) + '">Request a Quote</a>' +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</footer>";
    }

    /* ---------- Pricing cards (single source: config.pricing) ---------- */
    var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

    function quoteHref(slug) {
        var q = "?preselect=" + encodeURIComponent(slug) + "#contact";
        return isHome() ? q : "index.html" + q;
    }

    function priceHTML(p) {
        var currency = (C.pricing && C.pricing.currency) || "$";
        // Promotional card: normal price struck through + current promo price.
        if (p.promo) {
            var was = p.fullPrice
                ? '<s class="price-was">' + currency + esc(p.fullPrice) + "</s>"
                : "";
            return '<div class="price">' + was +
                '<span class="price-now">' + currency + esc(p.promoPrice) + "</span></div>";
        }
        // Range prices already include the "$" symbol (e.g. "15 – $30").
        var amount = p.isRange ? esc(p.price) : currency + esc(p.price);
        var suffix = p.suffix ? '<span class="price-suffix">' + esc(p.suffix) + "</span>" : "";
        var from = p.startingPrice ? '<span class="price-from">Starting at</span>' : "";
        return '<div class="price">' + from + amount + suffix + "</div>";
    }

    function packageCard(p) {
        var featured = p.recommended ? " featured" : "";
        var badge = p.recommended
            ? '<div class="pricing-badge">Recommended</div>'
            : (p.promo ? '<div class="pricing-badge promo">Promo Price</div>' : "");
        var features = (p.features || []).map(function (f) {
            return "<li>" + CHECK + "<span>" + esc(f) + "</span></li>";
        }).join("");
        var note = p.note ? '<p class="price-note">' + esc(p.note) + "</p>" : "";
        var preselect = (p.cta && p.cta.preselect) || p.slug;

        return '<div class="pricing-card' + featured + '" data-package="' + esc(p.slug) + '">' +
            badge +
            "<h3>" + esc(p.name) + "</h3>" +
            '<p class="price-desc">' + esc(p.suitableFor) + "</p>" +
            priceHTML(p) +
            note +
            '<ul class="pricing-features">' + features + "</ul>" +
            '<a class="btn btn-primary" href="' + esc(quoteHref(preselect)) + '" data-preselect="' + esc(preselect) + '">' + esc(p.cta.label) + "</a>" +
            "</div>";
    }

    function renderPricing() {
        var mount = document.getElementById("pricing-grid");
        if (!mount) return;
        var pr = C.pricing || {};
        var cards = [];
        if (pr.starter) cards.push(packageCard(pr.starter));
        if (pr.business) cards.push(packageCard(pr.business));
        if (pr.premium) cards.push(packageCard(pr.premium));
        mount.innerHTML = cards.join("");
    }

    // Render the additional-service groups (AI, Additional Services,
    // Maintenance) as labelled subsections.
    function renderPricingGroups() {
        var mount = document.getElementById("pricing-groups-mount");
        if (!mount) return;
        var groups = (C.pricing && C.pricing.pricingGroups) || [];
        var html = groups.map(function (g) {
            var cards = (g.cards || []).map(packageCard).join("");
            var subtitle = g.subtitle
                ? '<p class="pricing-group-subtitle">' + esc(g.subtitle) + "</p>"
                : "";
            return '<section class="pricing-group">' +
                '<div class="pricing-group-head text-center">' +
                '<h3 class="pricing-group-title">' + esc(g.title) + "</h3>" +
                subtitle +
                "</div>" +
                '<div class="pricing-grid">' + cards + "</div>" +
                "</section>";
        }).join("");
        mount.innerHTML = html;
    }

    /* ---------- Contact info block (single source: config.contact) ---------- */
    function renderContactInfo() {
        var mount = document.getElementById("contact-info");
        if (!mount) return;
        var ct = C.contact || {};
        var items = [];

        function row(icon, title, value, hrefAttr) {
            var inner = "<h4>" + esc(title) + "</h4><p>" + value + "</p>";
            var body = hrefAttr
                ? '<a href="' + esc(hrefAttr) + '">' + inner + "</a>"
                : inner;
            return '<div class="contact-detail">' +
                '<div class="icon-box">' + ICONS[icon] + "</div>" +
                "<div>" + body + "</div></div>";
        }

        if (ct.location) items.push(row("pin", "Location", esc(ct.location), href("#contact")));
        if (ct.email) items.push(row("mail", "Email", esc(ct.email), "mailto:" + esc(ct.email)));
        if (ct.phone) items.push(row("phone", "Phone", esc(ct.phone), telHref(ct.phone)));
        if (ct.whatsapp) items.push(row("chat", "WhatsApp", esc(ct.whatsapp), telHref(ct.whatsapp)));

        mount.innerHTML =
            "<h3>Contact Information</h3>" +
            "<p>" + esc(ct.contactNote || "Get in touch with MAB Technologies to discuss your project.") + "</p>" +
            '<div class="contact-details">' + items.join("") + "</div>";
    }

    /* ---------- Floating WhatsApp button (single source: config.contact.whatsapp) ---------- */
    function whatsappHref(v, message) {
        var digits = String(v || "").replace(/[^0-9]/g, "");
        if (!digits) return "";
        var url = "https://wa.me/" + digits;
        if (message) url += "?text=" + encodeURIComponent(message);
        return url;
    }

    function renderWhatsAppFab() {
        if (document.getElementById("whatsapp-fab")) return; // never duplicate
        var ct = C.contact || {};
        var hrefUrl = whatsappHref(ct.whatsapp, C.whatsappMessage);
        if (!hrefUrl) return; // no number configured → hide the button

        var a = document.createElement("a");
        a.id = "whatsapp-fab";
        a.className = "whatsapp-fab";
        a.href = hrefUrl;
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("aria-label", "Chat with MAB Technologies on WhatsApp");
        a.innerHTML =
            '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
            '<path fill="currentColor" d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.19 1.6 6.02L4 29l8.14-1.55a12 12 0 0 0 3.9.65h.01C22.68 28.1 28.08 22.7 28.08 16.06 28.08 8.4 22.68 3 16.04 3zm0 21.94h-.01c-1.2 0-2.38-.2-3.5-.6l-.4-.13-.35.08-3.2 1.1.94-3.12-.13-.4a8.9 8.9 0 0 1-.68-3.43c0-4.94 4.02-8.96 8.97-8.96 4.94 0 8.96 4.02 8.96 8.96 0 4.94-4.02 8.96-8.96 8.96zm5.06-6.7c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.18.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.6-.7.72-.94.12-.24.06-.44.02-.6-.04-.16-.6-1.46-.82-2-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.46.06-.7.32-.24.26-.92.9-.92 2.2 0 1.3.94 2.55 1.07 2.73.13.18 1.85 2.83 4.49 3.97.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.08 1.55-.63 1.77-1.25.22-.62.22-1.14.16-1.25-.07-.11-.26-.18-.54-.32z"/>' +
            "</svg>";
        document.body.appendChild(a);
    }

    window.MABShell = {
        esc: esc,
        href: href,
        isHome: isHome,
        homeHref: homeHref,
        ICONS: ICONS,
        renderHeader: renderHeader,
        renderFooter: renderFooter,
        renderPricing: renderPricing,
        renderPricingGroups: renderPricingGroups,
        renderContactInfo: renderContactInfo,
        renderWhatsAppFab: renderWhatsAppFab
    };

    // Render header immediately (script is placed right after the mount point)
    renderHeader();
    // Floating WhatsApp button appears on every page automatically
    renderWhatsAppFab();
})();
