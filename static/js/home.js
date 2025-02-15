import { logoutUser } from "./apis.js";

document.addEventListener("DOMContentLoaded", function () {
    const authButton = document.getElementById("auth-button");
    const arrowSpan = authButton.querySelector(".arrow");

    function updateAuthButton() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        
        if (isLoggedIn) {
            authButton.textContent = "Logout";
            authButton.classList.add("logout");
        } else {
            authButton.textContent = "Login";
            authButton.appendChild(arrowSpan);
            arrowSpan.textContent = "→";
            authButton.classList.remove("logout");
        }
    }

    // Add a slight delay to ensure localStorage is read correctly
    setTimeout(updateAuthButton, 100);

    authButton.addEventListener("click", async function () {
        if (localStorage.getItem("isLoggedIn") === "true") {
            const success = await logoutUser();
            if (success) {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("companyLogoUrl");
                localStorage.removeItem("companyId");
                localStorage.clear();  

                updateAuthButton();
                window.location.href = "login.html";
            }
        } else {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "dashboard.html";
        }
    });
});
const getAllEvents = async function () {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/events/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json();
        if (!response.ok) {
            throw new Error(response.error || 'something went wrong');
        }
        return result
    } catch (err) {
        return { error: err.message };
    }
}
document.addEventListener("DOMContentLoaded", async function () {
    const eventsGrid = document.getElementById("events-grid");
    // Function to create an event card
    function createEventCard(event) {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        eventCard.innerHTML = `
            <div class="company-card-logo">
                <img src="${event.logoUrl}" alt="${event.title} logo">
            </div>
            <div class="event-header">
                <div class="event-title-wrapper">
                    <h3 class="event-title">${event.title}</h3>
                    <span class="event-type">${event.eventType}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <p class="event-location">Location: ${event.location}</p>
                <p class="event-date">Date: ${new Date(event.date_time).toLocaleString()}</p>
            </div>
        `;
        return eventCard;
    }

    // Load events and populate the grid
    async function loadEvents() {
        const events = await getAllEvents();
        if (events.length > 0) {
            events.forEach((event) => {
                const eventCard = createEventCard(event);
                eventsGrid.appendChild(eventCard);
            });
        } else {
            eventsGrid.innerHTML = "<p>No events available</p>";
        }
    }
    // Call the loadEvents function to populate the grid
    loadEvents();
});


