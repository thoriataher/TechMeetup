import { createEvent, getEvents, updateEvent, deleteEvent } from "./apis.js";
const createEventBtn = document.getElementById('createEventBtn');
const eventModal = document.getElementById('eventModal');
const cancelBtn = document.getElementById('cancelBtn');
const eventForm = document.getElementById('eventForm');
const eventsGrid = document.getElementById('eventsGrid');
const searchInput = document.getElementById('searchInput');
const confirmPopUp = document.getElementById('confirm-content')
const confirmDiv = document.getElementById('confirmationModal')
const deleteButtonConfirm = document.getElementById('confirmDeleteBtn')
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn')
const editButton = document.getElementById('edit-button');
document.addEventListener('DOMContentLoaded', async function () {
    // Update the dashboard with the stored values
    const companyLogo = localStorage.getItem('companyLogoUrl');

    if (companyLogo) {
        document.querySelector('.company-logo').src = companyLogo; // Set logo image source
    }
    let isEditing = false;
    let currentEventCard = null;

    createEventBtn.addEventListener('click', function () {
        isEditing = false;
        eventForm.reset();
        clearErrorMessages();
        eventModal.classList.add('active');

    });


    cancelBtn.addEventListener('click', function () {
        eventModal.classList.remove('active');
        clearErrorMessages();
    });

    eventForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        clearErrorMessages();

        const company_id = localStorage.getItem('company_id');
        if (!company_id) {
            console.error('Company ID not found. Please log in again.');
            window.location.href = 'login.html';
            return;
        }
        const logoUrl = document.getElementById('logoUrl').value.trim();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const location = document.getElementById('location').value.trim();
        const date_time = document.getElementById('datetime').value;
        const eventTypeElement = document.querySelector('input[name="eventType"]:checked');

        let isValid = true;

        if (!logoUrl) {
            showError('logoUrl', 'Please enter a logo URL.');
            isValid = false;
            return;
        } else if (!isValidUrl(logoUrl)) {
            showError('logoUrl', 'Invalid logo URL. Please enter a valid URL.');
            isValid = false;
            return;
        }

        if (!title) {
            showError('title', 'Please enter a title.');
            isValid = false;
            return;
        }

        if (!description) {
            showError('description', 'Please enter a description.');
            isValid = false;
            return;
        }

        if (!location) {
            showError('location', 'Please enter a location.');
            isValid = false;
            return;
        }

        if (!eventTypeElement) {
            showError('eventType', 'Please select an event type.');
            isValid = false;
            return;
        }

        if (!isValid) {
            return;
        }

        if (isValid) {
            if (isEditing && currentEventCard) {
                // Update the event
                const eventType = eventTypeElement.value;
                const eventData = {
                    company_id: company_id,
                    logoUrl,
                    title,
                    description,
                    location,
                    date_time,
                    eventType
                };
                const updateCard = await updateEvent(company_id, currentEventCard.id, eventData);
                if (updateCard?.message) {
                    updateEventCard(updateCard);
                    window.location.href = 'dashboard.js';
                } else {
                    showError('form-error', updateCard?.error || "Can't update an event");
                }
            } else {
                const eventType = eventTypeElement.value;
                const eventData = {
                    company_id: company_id,
                    logoUrl,
                    title,
                    description,
                    location,
                    date_time,
                    eventType
                };
                const result = await createEvent(company_id, eventData);
                if (result?.message) {
                } else {
                    showError('form-error', result?.error || "Can't create an event");
                }
            }
            clearErrorMessages();
            eventModal.classList.remove('active');
        }
    });

    function createEventCard(event_id, logoUrl, title, description, location, date_time, eventType) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.id = event_id;
        eventCard.innerHTML = `
            <div class="event-header">
                <div class="company-card-logo">
                <img src=${logoUrl}>
                </div>
            </div>
            <div class="event-title-wrapper">
                <h3 class="event-title" id="event-title">${title}</h3>
                <span class="event-type" id="event-type">${eventType}</span>
            </div>
            <div>
                <p class="event-description" id="event-description">${description}</p>
                <div class="date-location-wrapper">
                    <p class="event-location" id="event-location">${location}</p>
            <p class="event-date" id="event-date">${date_time}</p>
                </div>
            </div>
            <div class="event-actions">
                <button class="delete-button" id="delete-button">Delete</button>
                <button class="edit-button" id="edit-button">Edit</button>
            </div>
        `;

        eventsGrid.appendChild(eventCard);
        addEventActions(eventCard);

    }


    function updateEventCard(card, logoUrl, title, description, location, date_time, eventType) {
        card.querySelector('.company-card-logo img').src = logoUrl;
        card.querySelector('.event-title').textContent = title;
        card.querySelector('.event-type').textContent = eventType;
        card.querySelector('.event-description').textContent = description;
        card.querySelector('.event-location').textContent = location;
        card.querySelector('.event-date').textContent = new Date(date_time).toLocaleString();

        saveEvents();
    }

    function addEventActions(eventCard) {
        const deleteButton = eventCard.querySelector('#delete-button');
        deleteButton.addEventListener('click', function (e) {
            const company_id = localStorage.getItem('company_id');
            deleteEvent(company_id, eventCard.id)

        });
        cancelDeleteBtn.addEventListener('click', function () {
            confirmPopUp.classList.add('hidden');
            confirmDiv.classList.add('hidden');
        });

        const editButton = eventCard.querySelector('#edit-button');
        editButton.addEventListener('click', function () {
            isEditing = true;
            currentEventCard = eventCard;

            document.getElementById('logoUrl').value = eventCard.querySelector('.company-card-logo img').src;
            document.getElementById('title').value = eventCard.querySelector('#event-title').textContent;
            document.getElementById('description').value = eventCard.querySelector('#event-description').textContent;
            document.getElementById('location').value = eventCard.querySelector('#event-location').textContent;
            document.getElementById('datetime').value = eventCard.querySelector('#event-date').textContent.slice(0, 16);
            document.querySelector(`input[name="eventType"]`).checked = true;

            eventModal.classList.add('active');
        });
    }

    function saveEvents() {
        const events = [];
        document.querySelectorAll('.event-card').forEach(eventCard => {
            events.push({
                logoUrl: eventCard.querySelector('.company-card-logo a').href,
                title: eventCard.querySelector('.event-title').textContent,
                description: eventCard.querySelector('.event-description').textContent,
                location: eventCard.querySelector('.event-location').textContent,
                date_time: eventCard.querySelector('.event-date').textContent,
                eventType: eventCard.querySelector('.event-type').textContent
            });
        });
        return events
    }

    async function loadEvents() {
        const company_id = localStorage.getItem('company_id');
        if (!company_id) {
            console.error('Company ID not found. Please log in again.');
            window.location.href = 'login.html';
            return;
        }

        try {
            const events = await getEvents(company_id);
            if (events?.error) {
                console.error(events.error)
            } else {
                events[0].map((event, i) => {
                    createEventCard(event?.id, event?.logoUrl, event?.title, event?.description, event?.location, event?.date_time, event?.eventType);
                })
            }

        } catch (error) {
            console.error("Error loading events: ", error);
        }
    }


    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    function showError(fieldId, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        const inputField = document.getElementById(fieldId);
        inputField.parentNode.insertBefore(errorElement, inputField.nextSibling);
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(errorElement => {
            errorElement.remove();
        });
    }
    loadEvents()
});

