<?php
require 'db.php';

session_start();

$error = ""; // Initialize error message

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $username;
            header("Location: front.html");
            exit();
        } else {
            $error = "Invalid credentials"; // Set error message
        }
    } else {
        $error = "Invalid credentials"; // Set error message
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In</title>
    <link rel="stylesheet" href="sign.css">
</head>
<body>
    <div class="form-container">
        <h2>Sign In</h2>
        
        <!-- Show error message if login fails -->
        <?php if (!empty($error)): ?>
            <p style="color: red;"><?php echo $error; ?></p>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <div class="input-field">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="input-field">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Sign In</button>
        </form>
        <p>Don't have an account? <a href="signup.html">Sign up</a></p>
    </div>
</body>
</html>
