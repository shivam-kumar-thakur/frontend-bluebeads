document.addEventListener("DOMContentLoaded",async ()=>{
    submitDetails();
});

const submitDetails=async ()=>{
    document.getElementById("submit").addEventListener("click",async ()=>{
        const head_name=document.getElementById("head_name").value;
        const phno=document.getElementById("phno").value;
        const email=document.getElementById("email").value;
        const gender=document.getElementById("gender").value;
        const dob=document.getElementById("dob").value;
        const ngo_name=document.getElementById("ngo_name").value;
        const description=document.getElementById("description").value;
        const address=document.getElementById("address").value;

        const data={
            ngo_name,
            ngo_description:description,
            "location": {
                "latitude": "51.5074",
                "longitude": "-0.1278"
            },
            ngo_head:head_name,
            head_phone:phno,
            head_email:email,
            head_address:address,
            head_dob:dob,
            head_gender:gender
        }

        try{
            const response=await fetch("https://api.bluebeads.shivamkrthakur.in/v1/ngo/ngo-details",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            })

            if(response.ok){
                const responseData=await response.json();
                if(responseData.statuscode===201){
                    window.location.href="ngo-profile.html";
                }
            }
            else{
                console.log("something is not correct : ",response);
            }
        }
        catch(error){
            console.log("something went wrong : ",error.message);
        }

    })
};