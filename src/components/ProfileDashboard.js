import React, { useState } from "react";

const ProfileDashboard = () => {
  // State to toggle Account Settings details visibility
  const [isAccountExpanded, setAccountExpanded] = useState(false);
  
  // States for form data
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("********");
  const [isEditable, setEditable] = useState(false); // Control edit mode for fields

  // Toggle Account Settings visibility
  const toggleAccountSettings = () => setAccountExpanded(!isAccountExpanded);

  // Handle input changes for email and password
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  // Save changes
  const handleSaveChanges = () => {
    console.log("Changes saved:", { email, password });
    setEditable(false); // Exit edit mode after saving
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      console.log("Account deleted");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile Dashboard</h2>
      <div style={styles.sections}>
        <div style={styles.card}>
          <h4 onClick={toggleAccountSettings} style={styles.cardHeader}>
            Account Settings
          </h4>
          <p>Manage your account preferences.</p>
          {isAccountExpanded && (
            <div style={styles.popUpContent}>
              <div style={styles.inputGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  disabled={!isEditable}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  disabled={!isEditable}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              </div>
              {isEditable ? (
                <div style={styles.actions}>
                  <button style={styles.button} onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => setEditable(false)} // Cancel edit mode
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button style={styles.button} onClick={() => setEditable(true)}>
                  Edit Info
                </button>
              )}
              <div style={styles.deleteSection}>
                <button style={styles.deleteButton} onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h4>Listen History</h4>
          <p>View and manage your listening history.</p>
        </div>

        <div style={styles.card}>
          <h4>Subscription</h4>
          <p>Current Plan: Premium</p>
          <button style={styles.button}>Upgrade Plan</button>
          <button style={styles.button}>Downgrade Plan</button>
        </div>

        <div style={styles.card}>
          <h4>Recent Activity</h4>
          <p>Last login: 2 hours ago</p>
          <p>Last change: Email updated</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#121212",
    color: "white",
    height: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  sections: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap", // Ensures responsiveness
  },
  card: {
    backgroundColor: "#1DB954",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "200px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    position: "relative", // Ensures the content stays within the card
  },
  cardHeader: {
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  popUpContent: {
    marginTop: "10px",
    textAlign: "left",
    animation: "fadeIn 0.3s ease-out", // Added smooth fade-in effect
  },
  inputGroup: {
    marginBottom: "15px",
  },
  inputField: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#121212",
    color: "white",
    marginTop: "5px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "#fff",
    color: "#1DB954",
    border: "none",
    padding: "8px 15px",
    margin: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  deleteSection: {
    marginTop: "20px",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "8px 15px",
    marginTop: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default ProfileDashboard;
