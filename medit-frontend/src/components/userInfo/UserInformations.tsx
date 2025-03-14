import { ListItem, Typography, Box, Button, Avatar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserInfoLabel } from "./UserInfoLabel";
import { ReturnIcon } from "../login/ReturnIcon";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { useLogin } from "../login/LoginContext";
import iconEdit from "../../assets/icon/edit.svg";
import iconPatient from "../../assets/icon/icon_patient.svg";
import { updateUserInDatabase } from "../../database/indexdb";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const UserInformations: React.FC = () => {
  const { translate } = useLanguage();
  const { user, setUser } = useLogin();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    user?.profileImage || null
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
    };

    try {
      const savedUser = await updateUserInDatabase(
        updatedUser,
        profileImageFile
      );
      console.log("User saved:", savedUser);
      setUser(savedUser);
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const initials = `${user?.firstName?.charAt(0).toUpperCase()}${user?.lastName
    ?.charAt(0)
    .toUpperCase()}`;

  return (
    <Box
      sx={{
        background: "#f7f7f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "6rem",
        width: "100%",
        overflowX: "hidden",
        height: "100vh",
        [theme.breakpoints.down("md")]: {
          "@media (orientation: landscape)": {
            height: "175vh",
          },
        },
      }}
    >
      <ReturnIcon path="/profile" color="black" />
      <ListItem
        sx={{
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontWeight: "bold",
              paddingBottom: "2rem",
              fontSize: "2rem",
              color: "#000000",
              textTransform: "capitalize",
              textAlign: "center",
              width: "90%",
            }}
          >
            {translate("userInfo")}
          </Typography>
        </ThemeProvider>

        <Box
          sx={{
            borderRadius: 5,
            display: "inline-table",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "21rem",
            "&:focus, &:focus-visible": {
              outline: "none",
            },
            padding: "1rem",
          }}
        >
          <ListItem
            alignItems="center"
            sx={{
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
              >
                <Avatar
                  src={profileImage as string}
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#00259D",
                    fontSize: "2.5rem",
                    color: "white",
                  }}
                >
                  {!profileImage && initials}
                </Avatar>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginTop: "1rem" }}
                >
                  {translate("upload")}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </Button>
              </Box>
              <Box>
                <UserInfoLabel
                  inputName="firstName"
                  img={iconEdit}
                  placeholder={firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    color: "black",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
                <UserInfoLabel
                  inputName="lastName"
                  img={iconEdit}
                  placeholder={lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    color: "black",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
                <UserInfoLabel
                  inputName="email"
                  img={iconEdit}
                  placeholder={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  showHr={false}
                  style={{
                    color: "black",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
              </Box>
            </Box>
          </ListItem>
        </Box>
      </ListItem>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          [theme.breakpoints.down("md")]: {
            "@media (orientation: landscape)": {
              width: "35%",
            },
          },
        }}
      >
        <Box
          sx={{
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            width: "100%",
            maxWidth: "20rem",
            justifyContent: "flex-start",
            padding: "0.5rem 1rem",
            height: "3rem",
            fontSize: "1.2rem",
            color: "black",
            fontWeight: "600",
            fontFamily: "Montserrat, Arial",
          }}
        >
          <img
            src={iconPatient}
            alt="patient icon"
            style={{ width: "3rem", marginRight: "0.5rem" }}
          />
          {translate(user?.role === "caregiver" ? "caregiver" : "patient")}
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "2rem" }}
        onClick={handleSave}
      >
        {translate("save")}
      </Button>
    </Box>
  );
};
