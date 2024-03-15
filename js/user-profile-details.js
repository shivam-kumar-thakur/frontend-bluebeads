document.getElementById("submit-btn").addEventListener("click", async (event) => {
    try {
        event.preventDefault(); // Prevent form submission
        
        const name = document.getElementById("name").value;
        const bloodGroup = document.getElementById("blood").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const location = document.getElementById("location").value;
        const dob = document.getElementById("dob").value;
        const email = document.getElementById("email").value;

        // Construct the data object
        const data = {
            userName: name,
            bloodGroup,
            gender,
            location: {
                latitude: 51.5074, // Replace with actual latitude
                longitude: -0.1278 // Replace with actual longitude
            },
            dob,
            email,
            last_donation_date:dob // Set last_donation_date to the current date
        };

        // Make POST request to the API endpoint
        const response = await fetch("https://api.bluebeads.shivamkrthakur.in/v1/user/user-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Handle response
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            window.location.href = "user-profile"; // Redirect to user profile page
        } else {
            console.error("Failed to submit data");
            console.log(response);
            // Handle error scenario
        }
    } catch (error) {
        console.error("An error occurred:", error);
        // Handle error scenario
    }
});
