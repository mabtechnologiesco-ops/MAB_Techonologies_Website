// ============================================================
// MAB TECHNOLOGIES CONFIG — Centralised company & pricing data
// ============================================================
// Edit this file to update company details, services, pricing,
// and contact info in ONE place. Every page imports it.

window.MABConfig = {

    // ---- Brand ----
    brand: {
        name: "MAB Technologies",
        tagline: "YOU IMAGINE IT. WE BUILD IT.",
        slug: "MAB_Techonologies_Website",
        locale: "en",
        dir: "ltr",
        currency: "$",
        currencyDisplay: "symbol", // "symbol" => "$2,500"
    },

    // ---- Contact ----
    contact: {
        location: "Freetown, Sierra Leone",
        email: "mabtechnologies.co@gmail.com",        // TODO: replace with real email
        phone: "+23278968909",
        whatsapp: "+23270451369",
        address: "Freetown, Sierra Leone",    // TODO: replace with street address
        contactNote: "Get in touch with MAB Technologies to discuss your project.",
        contactOptions: [
            { id: "email", label: "Email", value: "mabtechnologies.co@gmail.com" },
            { id: "whatsapp", label: "WhatsApp", value: "+23270451369" },
            { id: "phone", label: "Phone", value: "+23278968909" },
            { id: "visit", label: "Visit us", value: "Freetown, Sierra Leone" },
        ],
    },

    // ---- Social links ----
    social: [
        { name: "linkedin", url: "#", label: "LinkedIn" },
        { name: "twitter", url: "#", label: "Twitter / X" },
        { name: "github", url: "#", label: "GitHub" },
        { name: "youtube", url: "#", label: "YouTube" },
    ],

    // ---- Navigation ----
    nav: [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About Us" },
        { href: "#services", label: "Services" },
        { href: "#pricing", label: "Pricing" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ],

    // ---- CTA link ----
    ctaLink: {
        href: "#contact",
        label: "Request a Quote",
    },


    // ---- Pricing packages ---- (all prices in US dollars, "$")
    pricing: {
        currency: "$",
        base: "217",
        starter: {
            name: "Starter Website",
            slug: "starter-website",
            promo: true,
            promoPrice: "130",
            fullPrice: "217",
            suitableFor: "Small businesses, startups, freelancers, and local service providers.",
            features: [
                "Up to 3 pages",
                "Professional website design",
                "Responsive desktop and mobile layouts",
                "About Us section",
                "Services or product information",
                "WhatsApp contact button",
                "Contact information",
                "Social media links",
                "Basic SEO setup",
                "Website deployment",
            ],
            cta: { label: "Choose Starter", preselect: "starter-website" },
            note: "Save $87 — limited-time promotional price.",
        },
        business: {
            name: "Business Website",
            slug: "business-website",
            promo: false,
            recommended: true,
            price: "400",
            startingPrice: true,
            suitableFor: "Established businesses that want a stronger online presence.",
            features: [
                "Up to 7 pages",
                "Customised business website design",
                "Responsive desktop and mobile layouts",
                "Company profile",
                "Services pages",
                "Contact form",
                "WhatsApp integration",
                "Google Maps integration",
                "Basic SEO setup",
                "Google Business Profile assistance",
                "Website analytics setup",
                "Deployment and testing",
            ],
            cta: { label: "Choose Business", preselect: "business-website" },
            note: "Starting price for up to 7 pages.",
        },
        premium: {
            name: "Premium Website",
            slug: "premium-website",
            promo: false,
            price: "420",
            startingPrice: true,
            suitableFor: "Businesses that need a more advanced, customised website.",
            features: [
                "Up to 12 pages, depending on the agreed scope",
                "Premium website design",
                "Advanced visual interactions and animations where appropriate",
                "Custom forms and business workflows",
                "SEO configuration",
                "Analytics integration",
                "Performance optimisation",
                "Enhanced functionality based on project requirements",
                "Deployment and testing",
                "Optional AI customer-support integration, quoted separately or included only where explicitly agreed",
            ],
            cta: { label: "Request Premium Quote", preselect: "premium-website" },
            note: "Starting price. Final pricing depends on agreed scope.",
        },

        // ---- Additional services, grouped into clearly-labelled sections ----
        // Rendered by MABShell.renderPricingGroups() into #pricing-groups-mount.
        // Prices in US dollars ($). "startingPrice: true" shows "Starting at".
        // "suffix" appends a recurring period (e.g. /month, /year).
        pricingGroups: [
            {
                title: "AI Agents and Automation",
                subtitle: "Intelligent assistants and automated workflows.",
                cards: [
                    {
                        name: "AI Chatbots",
                        slug: "ai-chatbots",
                        price: "520",
                        startingPrice: true,
                        suitableFor: "Businesses that want automated customer support.",
                        features: [
                            "AI-powered chatbot",
                            "Automated enquiry handling",
                        ],
                        cta: { label: "Request a Quote", preselect: "custom-project" },
                        note: "Starting price. Final pricing depends on agreed scope.",
                    },
                    {
                        name: "AI Agents",
                        slug: "ai-agents",
                        price: "1,050",
                        startingPrice: true,
                        suitableFor: "Businesses that want intelligent task automation.",
                        features: [
                            "Custom AI agent",
                            "Workflow automation",
                        ],
                        cta: { label: "Request a Quote", preselect: "custom-project" },
                        note: "Starting price. Final pricing depends on agreed scope.",
                    },
                    {
                        name: "AI Automation",
                        slug: "ai-automation",
                        price: "2,100",
                        startingPrice: true,
                        suitableFor: "Businesses that want end-to-end process automation.",
                        features: [
                            "Automated business workflows",
                            "Custom automation integrations",
                        ],
                        cta: { label: "Request a Quote", preselect: "custom-project" },
                        note: "Starting price. Final pricing depends on agreed scope.",
                    },
                ],
            },
            {
                title: "Additional Services",
                subtitle: "Hosting, security, and growth add-ons.",
                cards: [
                    {
                        name: "Domain Registration",
                        slug: "domain-registration",
                        price: "210",
                        startingPrice: true,
                        suffix: "/year",
                        suitableFor: "Registering and managing your domain name.",
                        features: [
                            "Domain name registration",
                        ],
                        cta: { label: "Request a Quote", preselect: "custom-project" },
                    },
                    {
                        name: "SSL Certificate",
                        slug: "ssl-certificate",
                        price: "210",
                        startingPrice: true,
                        suffix: "/year",
                        suitableFor: "Securing your website with HTTPS.",
                        features: [
                            "SSL certificate setup",
                        ],
                        cta: { label: "Request a Quote", preselect: "custom-project" },
                    },
                    {
                        name: "Advanced SEO",
                        slug: "advanced-seo",
                        price: "65",
                        startingPrice: true,
                        suitableFor: "Improving your search engine visibility.",
                        features: [
                            "Advanced search engine optimisation",
                        ],
                        cta: { label: "Request a Quote", preselect: "custom-project" },
                    },
                    {
                        name: "Website Maintenance and Support",
                        slug: "website-maintenance-support",
                        price: "20",
                        startingPrice: true,
                        suffix: "/month",
                        suitableFor: "Ongoing upkeep and support for your website.",
                        features: [
                            "Ongoing maintenance and support",
                        ],
                        cta: { label: "Request a Quote", preselect: "custom-project" },
                    },
                ],
            },
            {
                title: "Website Maintenance Packages",
                subtitle: "Flexible support plans to fit your needs.",
                cards: [
                    {
                        name: "Basic Maintenance",
                        slug: "basic-maintenance",
                        price: "15 – $30",
                        isRange: true,
                        suffix: "/month",
                        suitableFor: "Essential upkeep for smaller websites.",
                        features: [
                            "Basic website maintenance",
                        ],
                        cta: { label: "Choose Basic", preselect: "custom-project" },
                    },
                    {
                        name: "Standard Maintenance",
                        slug: "standard-maintenance",
                        price: "30 – $65",
                        isRange: true,
                        suffix: "/month",
                        suitableFor: "More comprehensive maintenance and support.",
                        features: [
                            "Standard website maintenance",
                        ],
                        cta: { label: "Choose Standard", preselect: "custom-project" },
                    },
                    {
                        name: "Advanced Maintenance",
                        slug: "advanced-maintenance",
                        price: "65+",
                        startingPrice: true,
                        suffix: "/month",
                        suitableFor: "Priority maintenance for larger, busier websites.",
                        features: [
                            "Advanced website maintenance",
                        ],
                        cta: { label: "Choose Advanced", preselect: "custom-project" },
                    },
                ],
            },
        ],
    },


    // ---- Services ----
    services: [
        {
            title: "Website Design & Development",
            slug: "website-design-development",
            description: "We design and develop professional, responsive websites that help businesses establish credibility, showcase their services, and connect with customers online.",
            cta: { label: "Explore Website Packages", target: "#pricing", method: "anchor" },
            deliverables: [
                "Business websites",
                "Corporate websites",
                "Landing pages",
                "Portfolio websites",
                "Hotel and hospitality websites",
                "School and educational websites",
                "Insurance company websites",
                "Website redesigns",
                "Website performance improvements",
            ],
        },
        {
            title: "Web Applications & Mobile Applications",
            slug: "web-applications-mobile-applications",
            description: "We build custom digital applications that help businesses manage operations, serve customers, and deliver services more efficiently.",
            cta: { label: "Discuss Your Project", target: "#contact", method: "anchor" },
            solutions: [
                "Business management applications",
                "Inventory management systems",
                "Accounting and invoicing applications",
                "School management systems",
                "Booking and reservation systems",
                "Customer portals",
                "E-commerce platforms",
                "Progressive Web Apps and mobile applications",
            ],
        },
        {
            title: "AI Agents & Automation",
            slug: "ai-agents-automation",
            description: "We help businesses use artificial intelligence to improve customer support, automate repetitive tasks, and create more efficient workflows.",
            cta: { label: "Explore AI Solutions", target: "#contact", method: "anchor", service: "ai-agent-automation" },
            solutions: [
                "Website AI customer-support agents",
                "AI-powered frequently asked questions",
                "Automated customer enquiries",
                "Business workflow automation",
                "Lead capture and enquiry handling",
                "AI assistants for business operations",
                "Integration between compatible business tools",
            ],
        },
        {
            title: "Business Digitalisation",
            slug: "business-digitalisation",
            description: "We help businesses identify opportunities to improve how they work through digital tools, connected systems, and more efficient processes.",
            cta: { label: "Talk to Us", target: "#contact", method: "anchor" },
            solutions: [
                "Digitising manual workflows",
                "Connecting business tools",
                "Digital forms and data collection",
                "Reporting dashboards",
                "Operational process improvements",
            ],
        },
        {
            title: "Website Maintenance & Support",
            slug: "website-maintenance-support",
            description: "Keep your website reliable, updated, and working as expected with ongoing technical support and maintenance options.",
            cta: { label: "Talk to Us", target: "#contact", method: "anchor" },
            services: [
                "Website updates",
                "Bug fixes",
                "Content changes",
                "Basic performance monitoring",
                "Security updates where applicable",
                "Technical support",
            ],
            note: "Ongoing support is subject to the selected maintenance plan and agreement.",
        },
    ],


    // ---- Value propositions ----
    values: [
        {
            icon: "software",
            title: "Modern Digital Experiences",
            description: "Professional, responsive websites and applications designed around your business needs.",
        },
        {
            icon: "automation",
            title: "Intelligent Automation",
            description: "AI-powered assistants and automated workflows that help reduce repetitive work and improve customer support.",
        },
        {
            icon: "business",
            title: "Practical Business Solutions",
            description: "Technology designed to solve real business problems, improve efficiency, and support long-term growth.",
        },
    ],

    // ---- About section ----
    about: {
        heading: "About MAB Technologies",
        content: "MAB Technologies is a technology solutions company based in Freetown, Sierra Leone. We help businesses, entrepreneurs, and organisations embrace digital technology through professional websites, custom software applications, and AI-powered automation.",
        content2: "Our mission is to make modern technology more accessible and useful to businesses by building practical, reliable, and user-friendly digital solutions.",
        content3: "We believe every business should have the opportunity to use technology to improve its operations, reach more customers, and unlock new opportunities.",
        content4: "From establishing your online presence to developing software tailored to your business, we work to turn your ideas into practical digital products.",
        cta: { label: "Let&#8217;s Build Something", target: "#contact", method: "anchor" },
    },

    // ---- Hero section ----
    hero: {
        badge: "MAB Technologies",
        badgeSub: "Websites, Software & AI Automation for Growing Businesses",
        heading: "YOU IMAGINE IT. WE BUILD IT.",
        subheading: "Websites, Software & AI Automation for Growing Businesses.",
        description: "At MAB Technologies, we help businesses turn ideas into powerful digital solutions. From professional business websites and custom applications to intelligent AI agents and workflow automation, we build technology that helps your business work smarter and grow.",
        primaryButton: { label: "Explore Our Services", target: "#services", method: "anchor" },
        secondaryButton: { label: "Request a Quote", target: "#contact", method: "anchor" },
        imageSrc: "images/img_01.png",
        imageAlt: "Technology concept showing digital innovation and automation",
    },

    // ---- "Have a Bigger Idea" section ----
    biggerIdea: {
        heading: "Have a Bigger Idea?",
        description: "Not every business fits into a standard package. If you need a custom web application, mobile application, management system, or AI-powered business solution, tell us what you want to build.",
        examples: [
            "School management systems",
            "Accounting and invoicing applications",
            "Inventory management systems",
            "Booking and reservation platforms",
            "E-commerce applications",
            "AI customer-support agents",
            "Custom business automation",
        ],
        cta: { label: "Request a Custom Quote", target: "#contact", method: "anchor", preselect: "custom-project" },
    },


    // ---- How it works steps ----
    steps: [
        { number: "01", title: "Tell Us Your Idea", description: "Share your business goals, requirements, and the problem you want to solve.", emoji: "💬" },
        { number: "02", title: "Get a Proposal", description: "We review your requirements and provide a suitable solution, quotation, and estimated timeline.", emoji: "📋" },
        { number: "03", title: "We Build Your Solution", description: "We develop your website or application and test the agreed functionality.", emoji: "🛠️" },
        { number: "04", title: "Launch and Support", description: "After approval and completion of the agreed payment terms, we deploy the solution and provide any support included in your agreement.", emoji: "🚀" },
    ],

    // ---- Portfolio categories ----
    portfolio: {
        heading: "Selected Projects",
        subtitle: "A look at how we help businesses build, automate, and grow through digital products.",
        categories: [
            { name: "Business Websites", description: "Professional websites built for local businesses, from single-page sites to multi-page corporate sites." },
            { name: "Web Applications", description: "Custom web-based tools built to manage operations, store data, and serve customers. Demo/concept only." },
            { name: "AI Agents & Automation", description: "AI assistants and automated workflows that handle enquiries, support, and repetitive tasks. Demo/concept only." },
        ],
        demoNote: "The projects shown here are either concepts, demonstrations, or work done for previous clients under a non-disclosure agreement. Do not contact these clients directly about specific projects. New client work is not yet visible.",
        demoBadge: "DEMO / CONCEPT",
    },


    // ---- Quote form config ----
    form: {
        actionUrl: "", // TODO: set to your form backend endpoint (e.g. /api/quote) or form service URL
        successMessage: "Thank you for your message. We will get back to you within one working day.",
        errorMessage: "There was a problem submitting your form. Please check the errors below and try again.",
        notConfiguredMessage: "Online enquiries are not enabled yet on this website, so your message has not been sent. Please check back soon or contact MAB Technologies directly.",
        fieldLabels: {
            fullName: "Full name",
            businessName: "Business or organisation name",
            email: "Email address",
            phone: "WhatsApp or phone number",
            service: "A service",
            package: "Website package",
            budget: "Estimated budget",
            description: "Project description",
            contactMethod: "Preferred contact method",
        },
        serviceOptions: [
            { slug: "website-design-development", label: "Website Design & Development" },
            { slug: "web-application", label: "Web Application" },
            { slug: "mobile-application", label: "Mobile Application" },
            { slug: "ai-agent-automation", label: "AI Agent & Automation" },
            { slug: "website-maintenance", label: "Website Maintenance" },
            { slug: "other-custom", label: "Other / Custom Project" },
        ],
        extraPackageOptions: [
            { slug: "custom-project", label: "Custom Project — Requires quotation" },
            { slug: "not-sure", label: "Not Sure Yet" },
        ],
        budgetOptions: [
            "Under $250",
            "$250 – $500",
            "$500 – $1,000",
            "$1,000+",
            "Not Sure Yet",
        ],
        contactMethodOptions: [
            { value: "email", label: "Email" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "phone", label: "Phone" },
            { value: "webForm", label: "Web form" },
        ],
        required: ["fullName", "email", "service", "description"],
    },

};
