document.addEventListener("DOMContentLoaded",async function (){
    await loadbasicInfo();
})

async function loadbasicInfo(){
    // const responseData={
    //     "message": "NGO details retrieved successfully",
    //     "data": {
    //         "details": {
    //             "location": {
    //                 "coordinates": [
    //                     40.7128,
    //                     -74.006
    //                 ],
    //                 "country": "United States",
    //                 "state": "New York",
    //                 "postalCode": "10000",
    //                 "type": "Point"
    //             },
    //             "_id": "65d252a9f7c01b65cd7043be",
    //             "ngo_name": "ngo1",
    //             "ngo_description": "trail ngo",
    //             "camps": [],
    //             "ngoHeadName": "John Doe",
    //             "ngoHeadContact": "+91123456789",
    //             "ngoHeadEmail": "john@example.com",
    //             "ngoHeadGender": "male",
    //             "createdAt": "2024-02-18T18:55:37.650Z",
    //             "updatedAt": "2024-02-18T18:55:37.650Z",
    //             "__v": 0
    //         },
    //         "overallData": {
    //             "totalcamp": 0,
    //             "totalVoulntersRegister": 0,
    //             "totalDonorsRegister": 0,
    //             "totalPersonsDonated": 0,
    //             "bloodGroups": {
    //                 "A+": 10,
    //                 "A-": 0,
    //                 "B+": 20,
    //                 "B-": 45,
    //                 "AB+": 45,
    //                 "AB-": 0,
    //                 "O+": 23,
    //                 "O-": 45
    //             }
    //         }
    //     },
    //     "statuscode": 200,
    //     "success": true
    // };    
    try{
        const response=await fetch("https://api.bluebeads.shivamkrthakur.in/v1/ngo/ngo-profile",{
            method:"GET",
            headers:{
                "Content-Tpye":"application/json"
            }
        })

        const responseData=await response.json();
        console.log(responseData);

        if(responseData.statuscode===400 || responseData.statuscode===401){
            window.location.href="ngo-profile-details.html";
        }
        else if(responseData.statuscode===200){
            const primary_details=document.getElementById("primary-details-ngo");
            primary_details.innerHTML=`<p><span class="head-font-2">NGO NAME:</span>${responseData.data.details.ngo_name}</li>
            <p><span class="head-font-2">NGO Head Name:</span>${responseData.data.details.ngoHeadName}</li>
            <p><span class="head-font-2">NGO Head Contact:</span>${responseData.data.details.ngoHeadContact}</li>
            <p><span class="head-font-2">NGO Head Email:</span>${responseData.data.details.ngoHeadEmail}</li>
            <p><span class="head-font-2">NGO Head Gender:</span>${responseData.data.details.ngoHeadGender}</li>
            <p><span class="head-font-2">Location:</span>${responseData.data.details.location.state},${responseData.data.details.location.country},${responseData.data.details.location.postalCode}</li>`;


            const profile_photo=document.getElementById("head-image");
            profile_photo.setAttribute("width","180px");
            profile_photo.setAttribute("height","230px");

            if(responseData.data.details.ngoHeadGender==="male"){
                profile_photo.setAttribute("src","images/male.png");
            }
            else if(responseData.data.details.ngoHeadGender==="female"){
                profile_photo.setAttribute("src","images/female.jpg");
            }
            else{
                profile_photo.setAttribute("src","images/equality.png");
            }
            loadCampsInfo(responseData);
            loadOverallData(responseData);
            loadStats(responseData);
        }
        else{
            console.log("bro");
            // window.location.href="login.html";
        }
    }
    catch(error){
        console.error("Error : ",error.message);
    }
}

async function loadCampsInfo(responseData){
    const camp_data=document.getElementById("camps-data");
    if(responseData.data.details.camps.length===0){
        const div_create=document.createElement("div");
        div_create.classList.add("card","request-donation");
        div_create.setAttribute("id","no-data-camp");
        div_create.innerHTML=`
        <p class="head-font">No Camps Details found</p>
        <p><span class="head-font-3">Start your first camp and help the humanity.</span> B+</p>
        <div class="visit-btn">
            <div class="select-btn-card">
                <button class="button-1 btn-whi-select" id="dummy-done" onclick="location.href='new-camp.html'">Start</button>
            </div>
        </div>
    `;
    camp_data.appendChild(div_create);
    }
    else{
        for(const campId of responseData.data.details.camps){
            const camp_data_fetch=await fetch("https://api.bluebeads.shivamkrthakur.in/v1/camp/camp-admin",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    campId:campId
                })
            });
            if(camp_data_fetch.ok){
                const responseData=await camp_data_fetch.json();
                const div_create=document.createElement("div");
                div_create.classList.add("card","request-donation");
                div_create.innerHTML=`
            <p class="head-font">${responseData.campDetails.campName}</p>
            <p>${responseData.campDetails.campDescription}</p>
            <p><span class="head-font-3">Volunteer Registerd : </span>${responseData.campDetails.volunteersRegister.length}</p>
            <div class="visit-btn">
                <div class="select-btn-card">
                    <button class="button-1 btn-whi-select" id="${campId}" onclick="camp_page_call(this.id)">show</button>
                </div>
            </div>
        `
        camp_data.appendChild(div_create);
            }
        }
    }
}

function loadOverallData(responseData){
    document.getElementById("total-camps").innerText=`${responseData.data.overallData.totalcamp}`;
    document.getElementById("total-vol-reg").innerText=`${responseData.data.overallData.totalVoulntersRegister}`;
    document.getElementById("total-donor-reg").innerText=`${responseData.data.overallData.totalDonorsRegister}`;
    document.getElementById("total-people-donated").innerText=`${responseData.data.overallData.totalPersonsDonated}`;
}

function loadStats(responseData) {
    // Data for blood group counts (total and donated)
    let max = 0;

    Object.keys(responseData.data.overallData.bloodGroups).forEach((bloodgroup) => {
        if (parseInt(responseData.data.overallData.bloodGroups[bloodgroup]) > max) {
            max = parseInt(responseData.data.overallData.bloodGroups[bloodgroup]);
        }
    });

    // Get the tubes container
    const tubesContainer = document.getElementById("tubes-1");

    // Loop through each blood group data and update the HTML
    Object.keys(responseData.data.overallData.bloodGroups).forEach(bloodGroup => {
        // Create a card for each blood group
        const cardElement = document.createElement("div");
        cardElement.className = "card";

        const details = document.createElement("div");
        details.className = "details";

        // Create the tube element for the blood group
        const tubeElement = document.createElement("div");
        tubeElement.className = "tube";

        // Set the default percentage and color
        let percentage = 0;
        let fillColor = getRandomColor();

        if (max > 0) {
            percentage = (parseInt(responseData.data.overallData.bloodGroups[bloodGroup]) / max) * 100;
        }

        tubeElement.style.setProperty("--percent", percentage);
        tubeElement.style.setProperty("--fill-color", fillColor);

        // Construct the inner HTML of the tube element
        tubeElement.innerHTML = `
            <i class="cap"></i>
            <i class="fill"></i>
            <div class="base">
                <div class="icon"><i class="fa-duotone fa-chart-pie-simple"></i></div>
            </div>`;

        details.innerHTML = `
            <h3>${bloodGroup}</h3>
            <p style="font-weight: bold;"><span style="font-weight: bold; color: #940686">Total Units Collected </span>${responseData.data.overallData.bloodGroups[bloodGroup]}</p>`;

        // Append the details element to the card element
        cardElement.appendChild(details);

        // Append the tube element to the card element
        cardElement.appendChild(tubeElement);

        // Append the card element to the tubesContainer
        tubesContainer.appendChild(cardElement);
    });
}

// Function to generate random color
function getRandomColor() {
    // return "#" + Math.floor(Math.random() * 16777215).toString(16);
    return "#940686";
}


function camp_page_call(camp_id){
    var url=`https://api.bluebeads.shivamkrthakur.in/camp-admin:`+`camp_id`;
    window.location.href=url;
}