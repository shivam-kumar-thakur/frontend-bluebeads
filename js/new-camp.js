document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("create").addEventListener("click", async () => {
        try {
            const camp_name = document.getElementById("camp_name").value;
            const description = document.getElementById("description").value;
            const start = document.getElementById("start-time-date").value;
            const end = document.getElementById("ending-time-date").value;

            console.log("Start Input:", start);
            console.log("End Input:", end);

            // Convert the start and end strings to Date objects
            const start_time_date = new Date(start);
            const end_time_date = new Date(end);

            // Get date and time components
            const start_date = start_time_date.toISOString().slice(0, 10);
            // Extract hours only
            // const start_time = ("0" + start_time_date.getHours()).slice(-2) + ":" + ("0" + start_time_date.getMinutes()).slice(-2);
            const start_time = ("0" + start_time_date.getHours()).slice(-2);
            const end_date = end_time_date.toISOString().slice(0, 10);
            const end_time = ("0" + end_time_date.getHours()).slice(-2);

            const details = {
                camp_name: camp_name,
                "location": {
                    "latitude": "51.5074",
                    "longitude": "-0.1278"
                },
                description: description,
                start_date: start_date,
                start_time_hour: start_time,
                end_date: end_date,
                end_time_hour: end_time
            };

            // Make POST request to the API endpoint
            const response = await fetch("https://api.bluebeads.shivamkrthakur.in/v1/camp/new-camp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(details)
            });

            // Handle response
            const responseData = await response.json();
            console.log("Response Data:", responseData);
            if (responseData.statuscode === 201) {
                console.log("Data submitted successfully");
                window.location.href = "user-profile.html"; // Redirect to user profile page
            } else {
                console.error("Failed to submit data", responseData);
                // Handle error scenario
            }

        } catch (error) {
            console.error("An error occurred:", error);
            // Handle error scenario
        }
    });
});
