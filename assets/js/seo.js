(function () {
    "use strict";

    // Fungsi untuk menyisipkan Structured Data (Schema Markup)
    function addStructuredData(schema) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    // Data Structured Data (Schema Markup)
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "DNIC Project",
        "url": "https://www.dnicproject.com",
        "logo": "https://www.dnicproject.com/assets/1 LOGO DNIC PROJECT/logo profil/DNIC PROJECT kuning.png",
        "description": "Creative Digital Agency di Bulukumba yang menyediakan solusi branding, pemasaran digital, dan event management.",
        "sameAs": [
            "https://www.facebook.com/DNICProject",
            "https://www.instagram.com/DNICProject"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62 812-3456-7890",
            "contactType": "Customer Service"
        }
    };

    // Panggil fungsi untuk menambahkan Structured Data
    addStructuredData(schemaData);
})();
