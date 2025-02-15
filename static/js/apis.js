export async function registerCompany(userData, showError, showSuccess) {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.status === 400 || response.status === 409) {
            showError("form-error", data.error);
            return;
        }

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        if (data.company_id) {
            localStorage.setItem("company_id", data.company_id);
            localStorage.setItem("isLoggedIn", "true");
        }

        showSuccess("success-message", data.message);

        setTimeout(() => {
            // Redirect to company's dashboard
            window.location.href = `dashboard.html?company_id=${data.company_id}`;
        }, 2000);

        return data;
    } catch (error) {
        showError("form-error", error.message);
    }
}

export const loginUser = async (loginValues) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                loginValues
            )
        })
        const result = await response.json();
        if (result.company_id) {
            const session = localStorage.setItem('company_id', result.company_id);
        }
        if (result.company_logo_url) {
            localStorage.setItem('companyLogoUrl', result.company_logo_url);
        }
        localStorage.setItem('isLoggedIn', 'true');
        if (!response.ok) {
            throw new Error(result.error || 'something went wrong');
        }
        return result

    } catch (err) {
        console.error(err);
    }
}


export const createEvent = async (company_id, eventData) => {
    try {
        company_id = localStorage.getItem('company_id');
        if (!company_id) {
            window.location.href = "login.html"
        }
        const response = await fetch(`http://127.0.0.1:5000/api/v1/company/${company_id}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                eventData
            )
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

export const getEvents = async function (company_id) {
    try {
        company_id = localStorage.getItem('company_id');
        if (!company_id) {
            window.location.href = "login.html"
        }
        const response = await fetch(`http://127.0.0.1:5000/api/v1/company/${company_id}/events`, {
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

export const updateEvent = async function (company_id, event_id, eventData) {
    try {
        company_id = localStorage.getItem('company_id');
        if (!company_id) {
            window.location.href = "login.html"
        }
        const response = await fetch(`http://127.0.0.1:5000/api/v1/company/${company_id}/events/${event_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
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

export const deleteEvent = async function (company_id, event_id) {
    try {
        company_id = localStorage.getItem('company_id');
        if (!company_id) {
            window.location.href = "login.html"
        }
        const response = await fetch(`http://127.0.0.1:5000/api/v1/company/${company_id}/events/${event_id}`, {
            method: 'DELETE',
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

export const logoutUser = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
        });

        if (response.ok) {
            // Clear local storage after successful logout
            localStorage.clear();
            // Prevent back button issue
            history.replaceState(null, "", location.href);
            window.location.href = "login.html";
        }

        return response.ok; 
    } catch (error) {
        return false;
    }
};