
emailjs.init("cRb1EigFwd1xJWoax");


document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const formData = new FormData(this);

    
    emailjs.send("service_svfrbe5", "template_oibqu6n", {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    })
    .then(function () {
        alert("Message sent successfully!");
    }, function (error) {
        alert("Failed to send message: " + error.text);
    });
});
