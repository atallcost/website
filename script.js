document.addEventListener('DOMContentLoaded', () => {
     /* =========================================
       MESSAGE DE SUCCÈS (Formulaire Contact)
       ========================================= */
    // On regarde si l'URL contient "?success=true"
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === 'true') {
        const contactSection = document.getElementById('contact');
        
        // On remplace le formulaire par un message de remerciement
        if (contactSection) {
            const container = contactSection.querySelector('.container');
            container.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h2 style="color: #facc15; font-size: 2.5rem;">🚀 Message envoyé !</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 30px;">Merci de nous avoir contactés.<br>L'équipe At All Cost vous répondra très vite.</p>
                    <a href="index.html" class="nav-link" style="display:inline-block;">Retour à l'accueil</a>
                </div>
            `;
            // On fait défiler la page jusqu'au message pour être sûr qu'il le voie
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    /* ============================================================
        GESTION DYNAMIQUE DES ÉVÉNEMENTS
       ============================================================ */
    const upcomingContainer = document.getElementById('upcoming-events');
    const pastContainer = document.getElementById('past-events');

    // On vérifie si les conteneurs existent pour éviter les erreurs sur les autres pages
    if (upcomingContainer && pastContainer) {

        // --- LISTE DES ÉVÉNEMENTS  ---
        const allEvents = [
            // --- FUTURS ---
            {
                title: "Learning Technologies", 
                desc: "Le salon de référence dédié au Digital Learning et l'impact de l'IA sur l'éducation.",
                date: "2026-01-29",
                displayDate: "29 Janvier 2026",
                url: "https://www.learningtechnologiesfrance.com/"
            },
            {
                title: "AI x No Code Summit",
                desc: "Exploration des synergies entre l'IA et le No Code pour créer sans coder.",
                date: "2026-02-10",
                displayDate: "10 Février 2026",
                url: "https://ai-day.org/"
            },
            {
                title: "GenAI Summit",
                desc: "Le sommet incontournable dédié à l'IA générative et ses cas d'usage.",
                date: "2026-04-10",
                displayDate: "10 Avril 2026",
                url: "https://luma.com/genaisummitparis"
            },
            {
                title: "Vivatech Paris",
                desc: "Le rendez-vous mondial des startups et de l'innovation technologique à Paris.",
                date: "2026-06-17",
                displayDate: "17 Juin 2026",
                url: "https://vivatech.com/partners/vivatech-2026"
            },

            // --- ARCHIVES ---
            {
                title: "Atelier : Premiers pas avec l'IA", 
                desc: "Découverte interactive des bases de ChatGPT et des outils de génération d’images.",
                date: "2025-11-30",
                displayDate: "30 Novembre 2025",
                url: "" 
            },
            {
                title: "Meetup IA Kedge", 
                desc: "Conférence au Kedge Business School sur l'IA et les métiers créatifs.",
                date: "2025-12-11",
                displayDate: "11 Décembre 2025",
                url: ""
            }
        ];

        // --- LOGIQUE AUTOMATIQUE DE TRI ET D'AFFICHAGE ---
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Tri des événements par date
        allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        allEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const article = document.createElement('article');

            // Préparation du bouton lien
            let buttonHtml = '';
            if (event.url && event.url !== "") {
                buttonHtml = `<a href="${event.url}" target="_blank" class="btn-link">En savoir +</a>`;
            }

            // Calcul du badge "Bientôt" (si l'événement est dans 7 jours ou moins)
            const isSoon = (eventDate >= today && (eventDate - today) / (1000 * 60 * 60 * 24) <= 7);
            const badgeHtml = isSoon ? '<span class="badge">Bientôt !</span>' : '';

            // Icône différente selon passé ou futur
            const icon = eventDate >= today ? '📅' : '🏁';

            // HTML de la carte
            article.innerHTML = `
                <h3>${event.title}</h3>
                <p>${event.desc}</p>
                <div class="event-actions">
                    <div class="event-date">
                        ${icon} ${event.displayDate} ${badgeHtml}
                    </div>
                    ${buttonHtml}
                </div>
            `;

            // Injection dans le bon conteneur (Futur ou Passé)
            if (eventDate >= today) {
                article.className = 'event';
                upcomingContainer.appendChild(article);
            } else {
                article.className = 'event past';
                pastContainer.prepend(article); // On met les plus récents en haut de la pile archives
            }
        });

        // Message si aucun événement futur
        if (upcomingContainer.children.length === 0) {
            upcomingContainer.innerHTML = '<p>Aucun événement prévu pour le moment.</p>';
        }
    }

    /* ============================================================
       VALIDATION FORMULAIRE (Page Contact uniquement)
       ============================================================ */
    const formElement = document.getElementById('contactForm');
    if (formElement) {
        formElement.addEventListener('submit', function (e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                this.reportValidity();
            }
        });
    }

    /* ============================================================
       MENU MOBILE 
       ============================================================ */
    /* const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }
    */

}); //  FIN DU DOMContentLoaded 

/* ============================================================
   ANIMATION AU SCROLL
   ============================================================ */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add('visible');
        } 
         else { el.classList.remove('visible'); } // Optionnel
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);