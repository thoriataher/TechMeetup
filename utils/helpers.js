export function formatEventDate(dateString) {
    // Step 1: Parse the date manually (since it's in "DD-MM-YYYY h:mm:ssA" format)
    const [day, month, year, time] = dateString.split(/[-\s]/); // Split by "-" and space
    const formattedDate = new Date(`${year}-${month}-${day} ${time}`); // Convert to Date object

    // Step 2: Format the date (adjust locale as needed)
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',  // Example: "Sunday"
        year: 'numeric',   // Example: "2025"
        month: 'long',     // Example: "February"
        day: 'numeric',    // Example: "16"
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true       // Ensure AM/PM format
    }).format(formattedDate);
}

