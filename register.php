<?php
require 'db.php';

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT);

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    header("Location: signin.html");
} else {
    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        header("Location: signin.html");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>