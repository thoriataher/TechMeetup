// import { getEvents } from "./apis";
document.addEventListener("DOMContentLoaded", async function () {
    const authButton = document.getElementById("auth-button");
    const arrowSpan = authButton.querySelector(".arrow");

    function updateAuthButton() {
        if (localStorage.getItem("isLoggedIn") === "true") {
            authButton.textContent = "Logout";
            authButton.classList.add("logout");
        } else {
            authButton.textContent = "Login";
            authButton.appendChild(arrowSpan);
            arrowSpan.textContent = "→";
            authButton.classList.remove("logout");
        }
    }

    authButton.addEventListener("click", function () {
        if (localStorage.getItem("isLoggedIn") === "true") {
            localStorage.removeItem("isLoggedIn");
        } else {
            localStorage.setItem("isLoggedIn", "true");
        }
        updateAuthButton();
    });

    updateAuthButton();
});


const getAllEvents = async function getAllEvents() {
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
    console.log("test")
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
        console.log(events);
        if (events.length > 0) {
            events.forEach((event) => {
                eventCard = createEventCard(event);
                eventsGrid.appendChild(eventCard);
            });
        } else {
            eventsGrid.innerHTML = "<p>No events available</p>";
        }
    }
    // Call the loadEvents function to populate the grid
    loadEvents();
});