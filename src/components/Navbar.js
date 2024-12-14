import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBell } from "react-icons/fa"; // Add profile and notification icons

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <Link to="/" style={styles.link}>
          <div style={styles.logoContainer}>
            <img
              src="/images/icon.jpg" // Replace with your logo URL
              alt="PlayTune Logo"
              style={styles.logo}
            />
          </div>
          <span style={styles.brandText}>PlayTune</span>
        </Link>
      </div>
      <div style={styles.rightSection}>
        {/* Notification Icon */}
        <div style={styles.iconContainer}>
          <FaBell style={styles.icon} />
        </div>

        {/* Profile Icon and Link */}
        <Link to="/profile" style={styles.profileLink}>
          <div style={styles.iconContainer}>
            <FaUserCircle style={styles.icon} />
          </div>
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#1DB954", // Spotify green color
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Ensures both logo and text are vertically centered
    padding: "10px 20px",
  },
  brand: {
    display: "flex",
    alignItems: "center", // Vertically center the logo and text
  },
  logoContainer: {
    width: "40px", // Set a specific width for the logo container
    height: "40px", // Set a specific height for the logo container
    borderRadius: "50%", // Make the container round
    overflow: "hidden", // Ensure the logo fits within the circle
    marginRight: "10px", // Space between logo and text
  },
  logo: {
    width: "100%", // Make the image fill the container
    height: "100%", // Make the image fill the container
    objectFit: "cover", // Maintain the aspect ratio of the image
  },
  brandText: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
    display: "inline-block", // Ensures text remains on the same line as logo
    verticalAlign: "middle", // Align text with the middle of the logo
  },
  link: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: "20px", // Space between icons
    cursor: "pointer", // Make icons clickable
  },
  icon: {
    fontSize: "1.5rem", // Size of the icons
    color: "white", // Icon color
  },
  profileLink: {
    textDecoration: "none", // Remove underline from profile link
  },
};

export default Navbar;
