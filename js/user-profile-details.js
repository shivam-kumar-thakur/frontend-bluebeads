
document.getElementById("submit-btn").addEventListener("click", async (event) => {
    
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
        last_donation_date: "" // You may add last donation date if available, otherwise leave it empty
    };
    try {
        // Make POST request to the API endpoint
        const response = await fetch("https://api.bluebeads.shivamkrthakur.in/v1/user/user-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        // Handle response
        const responseData=await response.json();
        console.log(responseData);
        if (responseData.ok) {
            window.location.href="user-profile";
        } else {
            console.error("Failed to submit data");
            // Handle error scenario
        }
    } catch (error) {
        console.error("An error occurred:", error);
        // Handle error scenario
    }
});