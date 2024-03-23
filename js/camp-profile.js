document.addEventListener("DOMContentLoaded",async ()=>{
    //campId nikalo aur send karo
    loadInfo(camp_id);
    loadRegisterVolunteerDetails(camp_id);
    loadDonatedUsersDetails(camp_id);
});

async function loadInfo(campId){
    // {
    //     "message": "Success: Camp details retrieved successfully.",
    //     "data": {
    //         "campDetails": {
    //             "_id": "65fb5aa5e9bc58eb24e63631",
    //             "campName": "dd",
    //             "ngo": "65fb5a81e9bc58eb24e63628",
    //             "campDescription": "s",
    //             "donationStartDate": "2024-03-05T00:00:00.000Z",
    //             "donationEndDate": "2024-03-09T00:00:00.000Z",
    //             "donationStartTime": 3,
    //             "donationsEndTime": 3,
    //             "location": {
    //                 "type": "Point",
    //                 "coordinates": [
    //                     51.5074,
    //                     -0.1278
    //                 ],
    //                 "country": "United Kingdom",
    //                 "state": "England",
    //                 "postalCode": "SW1A 2DR",
    //                 "_id": "65fb5aa5e9bc58eb24e63632"
    //             },
    //             "donorsRegister": [],
    //             "volunteersRegister": [],
    //             "createdAt": "2024-03-20T21:52:37.127Z",
    //             "updatedAt": "2024-03-20T21:52:37.127Z",
    //             "__v": 0
    //         },
    //         "overallData": {
    //             "totalcamp": 1,
    //             "totalVoulntersRegister": 0,
    //             "totalDonorsRegister": 0,
    //             "totalPersonsDonated": 0,
    //             "bloodGroups": {
    //                 "A+": {
    //                     "total": 0,
    //                     "donated": 0
    //                 },
    //                 "A-": {
    //                     "total": 0,
    //                     "donated": 0
    //                 },
    //                 "B+": {
    //                     "total": 0,
    //                     "donated": 0
    //                 },
    //                 "B-": {
    //                     "total": 0,
    //                     "donated": 0
    //                 },
    //                 "AB+": {
    //                     "total": 0,
    //                     "donated": 0
    //                 },
    //                 "AB-": {
    //                     "total": 0,
    //                     "donated": 0
    //                 },
    //                 "O+": {
    //                     "total": 0,
    //                     "donated": 0
    //                 },
    //                 "O-": {
    //                     "total": 0,
    //                     "donated": 0
    //                 }
    //             }
    //         }
    //     },
    //     "statuscode": "201",
    //     "success": true
    // }
    try{
        const response=await fetch("https://api.bluebeads.shivamkrthakur.in/v1/ngo/ngo-profile",{
            method:"GET",
            headers:{
                "Content-Tpye":"application/json"
            },
            body:JSON.stringify({
                campId:campId
            })
        });

        if(!response.ok){
            console.log("Something Went wrong !");
        }

        const responseData=await response.json();
        console.log(responseData);

        if(responseData.statuscode===400 || responseData.statuscode===401){
            window.location.href="ngo-profile-details.html";
        }
        else if(responseData.statuscode===200){
            const Start_Time="Script likh kr date nikal kr show karo";
            const End_Time="Script likh kr date nikal kr show karo";
            const primary_details=document.getElementById("primary-details-ngo");
            primary_details.innerHTML=`<p><span class="head-font-2">Camp Name:</span>${responseData.data.campDetails.campName}</p>
            <p><span class="head-font-2">Camp Desciption :</span>${responseData.data.campDetails.campDescription}</p>
            <p><span class="head-font-2">Start Date :</span>${responseData.data.campDetails.donationStartDate}</p>
            <p><span class="head-font-2">End Date :</span>${responseData.data.campDetails.donationEndDate}</p>
            <p><span class="head-font-2">Start Time :</span>${Start_Time}</p>
            <p><span class="head-font-2">End Time :</span>${End_Time}</p>
            <p><span class="head-font-2">Location :</span>${responseData.data.campDetails.location.state},${responseData.data.campDetails.location.country},${responseData.data.campDetails.location.postalCode}</p>`;

            const profile_photo=document.getElementById("head-image");
            profile_photo.setAttribute("width","180px");
            profile_photo.setAttribute("height","230px");
            profile_photo.setAttribute("src","images/male.png");

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



function loadOverallData(responseData){
    document.getElementById("total-camps").innerText=`${responseData.data.overallData.totalcamp}`;
    document.getElementById("total-vol-reg").innerText=`${responseData.data.overallData.totalVoulntersRegister}`;
    document.getElementById("total-donor-reg").innerText=`${responseData.data.overallData.totalDonorsRegister}`;
    document.getElementById("total-people-donated").innerText=`${responseData.data.overallData.totalPersonsDonated}`;
}
async function loadDonatedUsersDetails(campId){
    const vol_div=document.getElementById("donation-data");
    try{
        const response=await fetch("",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                campId:campId
            })
        });

        if(!response.ok){
            console.log("Something Went wrong !")
        }

        const responseData=await response.json();
        // {
        //     data:{
        // //         users:[{
            //     userId: donors.donor,
            //     userName: userInfo.userName,
            //     bloodGroup: userInfo.bloodGroup,
            //     gender: userInfo.gender,
            //     dob: userInfo.dob,
            //     Number: signupDetails.phone_num
            // }]
        //     }
        // }
        responseData.data.users.forEach((volunteer)=>{
            const single_donor_details=document.createElement("div");
            single_donor_details.classList.add("card","request-donation");
            single_donor_details.setAttribute("class",`${volunteer.userId}`);
            const innerhtml_single_vol_det=`
                    <p class="head-font">${volunteer.userName}</p>
                    <p><span class="head-font-3">Blood Group : </span>${volunteer.userName}</p>
                    <p><span class="head-font-3">Gender : </span>${volunteer.gender}</p>
                    <p><span class="head-font-3">Date of Birth : </span>${volunteer.dob}<</p>
                    <p><span class="head-font-3">Contact Number : </span>${volunteer.Number}</p>
                    <div class="select-btn-card">
                        <button class="button-1 btn-whi-select" onClick="markUserDonated(this.id)" id="${volunteer.userId}">Mark Done</button>
                    </div>
                    `;
            single_donor_details.innerHTML=innerhtml_single_vol_det;
            vol_div.appendChild(single_donor_details);
        });


    }
    catch(error){
        console.log("Something Went wrong while fetching : ",error)
    }
}

async function markUserDonated(user_id){
    
}

async function loadDonatedUsersDetails(campId){
    const vol_div=document.getElementById("donation-data");
    try{
        const response=await fetch("",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                campId:campId
            })
        });

        if(!response.ok){
            console.log("Something Went wrong !")
        }

        const responseData=await response.json();
        // {
        //     data:{
        // //         users:[{
            //     userId: donors.donor,
            //     userName: userInfo.userName,
            //     bloodGroup: userInfo.bloodGroup,
            //     gender: userInfo.gender,
            //     dob: userInfo.dob,
            //     Number: signupDetails.phone_num
            // }]
        //     }
        // }
        responseData.data.users.forEach((volunteer)=>{
            const single_donor_details=document.createElement("div");
            single_donor_details.classList.add("card","request-donation");
            single_donor_details.setAttribute("class",`${volunteer.userId}`);
            const innerhtml_single_vol_det=`
                    <p class="head-font">${volunteer.userName}</p>
                    <p><span class="head-font-3">Blood Group : </span>${volunteer.userName}</p>
                    <p><span class="head-font-3">Gender : </span>${volunteer.gender}</p>
                    <p><span class="head-font-3">Date of Birth : </span>${volunteer.dob}<</p>
                    <p><span class="head-font-3">Contact Number : </span>${volunteer.Number}</p>
                    <div class="select-btn-card">
                        <button class="button-1 btn-whi-select" onClick="removeUserDonated(this.id)" id="${volunteer.userId}">Not Done</button>
                    </div>
                    `;
            single_donor_details.innerHTML=innerhtml_single_vol_det;
            vol_div.appendChild(single_donor_details);
        });


    }
    catch(error){
        console.log("Something Went wrong while fetching : ",error)
    }
}

async function removeUserDonated(user_id){
    
}

async function loadRegisterVolunteerDetails(campId){
    const vol_div=document.getElementById("data-volunters");
    try{
        const response=await fetch("",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                campId:campId
            })
        });

        if(!response.ok){
            console.log("Something Went wrong !")
        }

        const responseData=await response.json();
        // {
        //     data:{
        // //         volunters:[{
        //         userId:elements.donor,
        //         userName: userInfo.userName,
        //         bloodGroup: userInfo.bloodGroup,
        //         gender: userInfo.gender,
        //         dob: userInfo.dob,
        //         Number:signupDetails.phone_num
        //     }]
        //     }
        // }
        responseData.data.volunters.forEach((volunteer)=>{
            const single_vol_details=document.createElement("div");
            single_vol_details.classList.add("card","request-donation");
            single_vol_details.setAttribute("class",`${volunteer.userId}`);
            const innerhtml_single_vol_det=`
                    <p class="head-font">${volunteer.userName}</p>
                    <p><span class="head-font-3">Blood Group : </span>${volunteer.userName}</p>
                    <p><span class="head-font-3">Gender : </span>${volunteer.gender}</p>
                    <p><span class="head-font-3">Date of Birth : </span>${volunteer.dob}<</p>
                    <p><span class="head-font-3">Contact Number : </span>${volunteer.Number}</p>
                    <div class="select-btn-card">
                        <button class="button-1 btn-whi-select-mark" onClick="removeVolunteer(this.id)" id="${volunteer.userId}">-</button>
                    </div>
                    `;
            single_vol_details.innerHTML=innerhtml_single_vol_det;
            vol_div.appendChild(single_vol_details);
        });


    }
    catch(error){
        console.log("Something Went wrong while fetching : ",error)
    }
}

async function removeVolunteer(user_id){
    
}

async function loadVolunterRequests(campId){
    const vol_div=document.getElementById("data-volunters");
    try{
        const response=await fetch("",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                campId:campId
            })
        });

        if(!response.ok){
            console.log("Something Went wrong !")
        }

        const responseData=await response.json();
        // {
        //     data:{
        // //         volunteers:[{
        //         userId:elements.donor,
        //         userName: userInfo.userName,
        //         bloodGroup: userInfo.bloodGroup,
        //         gender: userInfo.gender,
        //         dob: userInfo.dob,
        //         Number:signupDetails.phone_num
        //     }]
        //     }
        // }
        responseData.data.volunteers.forEach((volunteer)=>{
            const single_vol_details=document.createElement("div");
            single_vol_details.classList.add("card","request-donation");
            single_vol_details.setAttribute("class",`${volunteer.userId}`);
            const innerhtml_single_vol_det=`
                    <p class="head-font">${volunteer.userName}</p>
                    <p><span class="head-font-3">Blood Group : </span>${volunteer.bloodGroup}</p>
                    <p><span class="head-font-3">Gender : </span>${volunteer.gender}</p>
                    <p><span class="head-font-3">Date of Birth : </span>${volunteer.dob}<</p>
                    <p><span class="head-font-3">Contact Number : </span>${volunteer.Number}</p>
                    <div class="select-btn-card-2">
                        <button class="button-1 btn-ora-select-mark" id="${volunteer.userId}-approve" onClick="approveVol(this.id)">+</button>
                        <button class="button-1 btn-whi-select-mark" id="${volunteer.userId}-reject" onClick="rejectVol(this.id)">-</button>
                    </div>
                    <div class="select-btn-card">
                        <button class="button-1 btn-whi-select-mark" onClick="removeVolunteer(this.id)" id="${volunteer.userId}">-</button>
                    </div>
                    `;
            single_vol_details.innerHTML=innerhtml_single_vol_det;
            vol_div.appendChild(single_vol_details);
        });


    }
    catch(error){
        console.log("Something Went wrong while fetching : ",error)
    }
}

async function approveVol(user_id){
    
}
async function rejectVol(user_id){
    
}

function loadStats(responseData) {
    const bloodData=responseData.data.overallData;
    document.addEventListener("DOMContentLoaded", function() {
        // Data for blood group counts (total and donated)
        const data = {
            "A+": { total:bloodData["A+"].total, donated: bloodData["A+"].donated },
            "A-": { total:bloodData["A-"].total, donated: bloodData["A-"].donated},
            "B+": { total:bloodData["B+"].total, donated: bloodData["B+"].donated },
            "B-": { total:bloodData["B-"].total, donated: bloodData["B-"].donated},
            "AB+":{ total:bloodData["AB+"].total, donated: bloodData["AB+"].donated},
            "AB-":{ total:bloodData["AB-"].total, donated: bloodData["AB-"].donated},
            "O+": { total:bloodData["O+"].total, donated: bloodData["O+"].donated},
            "O-": { total:bloodData["O-"].total, donated: bloodData["O-"].donated}
        };

        // Get the tubes container
        const tubesContainer = document.getElementById("tubes-1");

        // Loop through each blood group data and update the HTML
        Object.keys(data).forEach(bloodGroup => {
            // Create a card for each blood group
            const cardElement = document.createElement("div");
            cardElement.className = "card";

            const details=document.createElement("div");
            details.className="details"

            // Create the tube element for the blood group
            const tubeElement = document.createElement("div");
            tubeElement.className = "tube";
            tubeElement.style.setProperty("--percent", (data[bloodGroup].donated / data[bloodGroup].total) * 100);
            tubeElement.style.setProperty("--fill-color", getRandomColor());

            // Construct the inner HTML of the tube element
            tubeElement.innerHTML = `
                <i class="cap"></i>
                <i class="fill"></i>
                <div class="base">
                    <div class="icon"><i class="fa-duotone fa-chart-pie-simple"></i></div>
                </div>`;
            // <div class="text">${bloodGroup}: ${data[bloodGroup].donated}/${data[bloodGroup].total}</div>
                details.innerHTML=`
                <h3>${bloodGroup}</h3>
                <p style="font-weight: bold;"><span style="font-weight: bold; color: #940686">TOTAL REGISTRATION : </span>${data[bloodGroup].total}</p>
                <p style="font-weight: bold;"><span style="font-weight: bold; color: #940686">TOTAL DONATIONS : </span >${data[bloodGroup].donated}</p>
                `
                // Append the details element to the card element
            cardElement.appendChild(details);

            // Append the tube element to the card element
            cardElement.appendChild(tubeElement);

            // Append the card element to the tubesContainer
            tubesContainer.appendChild(cardElement);
        });

        // Function to generate random color
        function getRandomColor() {
            // return "#" + Math.floor(Math.random() * 16777215).toString(16);
            return "#940686"
        }
    });
}


// Function to generate random color
function getRandomColor() {
    // return "#" + Math.floor(Math.random() * 16777215).toString(16);
    return "#940686";
}
