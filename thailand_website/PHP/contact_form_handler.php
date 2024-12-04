<?php

$recipient_email = ".......";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $name = htmlspecialchars(string: trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    $errors = [];

    
    if (empty($name)) {
        $errors[] = "Name is required.";
    }

    
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    
    if (empty($message)) {
        $errors[] = "Message is required.";
    }

    
    if (empty($errors)) {
        $subject = "New Contact Form Submission from $name";
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $body = "You have received a new message from your website contact form:\n\n";
        $body .= "Name: $name\n";
        $body .= "Email: $email\n\n";
        $body .= "Message:\n$message\n";

        if (mail($recipient_email, $subject, $body, $headers)) {
            echo "Thank you for your message. We will get back to you shortly.";
        } else {
            echo "Sorry, your message could not be sent. Please try again later.";
        }
    } else {
        
        foreach ($errors as $error) {
            echo "<p style='color: red;'>$error</p>";
        }
    }
} else {
    echo "Invalid request method.";
}
?>
