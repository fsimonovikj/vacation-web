import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./../../screens/settings/styles/index.scss";
import { useAuth } from "../../auth/core/Auth";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import CodefixClient from "../../services/CodefixClient";
import { UserRole } from "../../interfaces/types";
import { capitalizeFirstLetter } from "../../core/utils/utils";

const ProfileSettings = () => {
  const { user, saveUser } = useAuth();
  const client = new CodefixClient();
  const isAdmin = user?.role === UserRole.Admin;

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [role, setRole] = useState(user?.role);
  // eslint-disable-next-line
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   eslint-disable-next-line
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset fields to initial user values and exit edit mode
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setEmail(user?.email);
    setRole(user?.role);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    // Logic to update the profile details
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      role,
    };
    await client.updateUser(updatedUser).then(async () => {
      await saveUser(updatedUser);
      toast.success("Profile updated successfully");
    });

    // On successful update, exit edit mode
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleCancelPasswordChange = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const passwordData = {
      ...user,
      currentPassword,
      newPassword,
    };

    await client.updateUser(passwordData).then(async (res) => {
      if (res && res.data) {
        await saveUser({
          ...user,
          password: newPassword,
        });
        toast.success("Password updated successfully");
      }
    });

    console.log("Password change data:", passwordData);
    setIsChangingPassword(false);
  };

  return (
    <Box className="profile-settings-content">
      <Card className="profile-settings-card">
        <CardContent>
          {/* PROFILE IMAGE */}
          {/* <Box display="flex" alignItems="center" className="profile-header">
            <Avatar
              src={profileImage || "/default-profile.png"}
              alt="Profile Image"
              className="profile-avatar"
            />
            <Box className="upload-avatar">
              <input
                type="file"
                accept="image/*"
                id="profile-image-upload"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <label htmlFor="profile-image-upload">
                <IconButton component="span">
                  <EditIcon />
                </IconButton>
              </label>
            </Box>
          </Box> */}
          <Typography
            variant="h5"
            className="profile-title"
            gutterBottom
            sx={{
              mb: 4,
            }}
          >
            Profile Details
          </Typography>
          <form className="profile-form">
            <Box className="profile-fields">
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                className="form-field"
                disabled={!isEditing}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                className="form-field"
                disabled={!isEditing}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                className="form-field"
                disabled
              />
              <TextField
                label="Company Name"
                variant="outlined"
                value="Mozok" // Hardcoded for now
                fullWidth
                className="form-field"
                disabled
              />
              {isEditing && isAdmin ? (
                <Select
                  label="Account Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  fullWidth
                  className="form-field"
                >
                  {Object.values(UserRole).map((role) => (
                    <MenuItem key={role} value={role}>
                      {capitalizeFirstLetter(role)}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <TextField
                  label="Account Role"
                  variant="outlined"
                  value={capitalizeFirstLetter(role || "")}
                  fullWidth
                  className="form-field"
                  disabled
                />
              )}
            </Box>
            <Box className="form-actions">
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    className="save-button"
                    startIcon={<SaveIcon />}
                    onClick={handleUpdate}
                    sx={{
                      mr: 2,
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className="cancel-button"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="save-button"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
      <Card className="profile-settings-card">
        <CardContent>
          <Typography
            variant="h5"
            className="profile-title"
            gutterBottom
            sx={{
              mb: 4,
            }}
          >
            Your Credentials
          </Typography>
          {isChangingPassword ? (
            <form className="profile-form">
              <Box className="profile-fields">
                <Box>
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    fullWidth
                    className="form-field"
                    disabled
                  />
                </Box>
                <Box>
                  <TextField
                    label="Current Password"
                    type="password"
                    variant="outlined"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                    className="form-field"
                  />
                  <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    className="form-field"
                  />
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    className="form-field"
                  />
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: "gray", mt: 2, mb: 2 }}>
                Password must include upper and lower case letters, numbers, and
                special characters.
              </Typography>
              <Box className="form-actions">
                <Button
                  variant="contained"
                  color="primary"
                  className="save-button"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdatePassword}
                  sx={{
                    mr: 2,
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="cancel-button"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelPasswordChange}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          ) : (
            <Box className="form-actions">
              <Button
                variant="contained"
                color="primary"
                className="save-button"
                startIcon={<EditIcon />}
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileSettings;
