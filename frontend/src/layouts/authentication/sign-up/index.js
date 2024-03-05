/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");


  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8081/register", {
        name: name,
        email: email,
        password: password,
        role:role,
      });
      // Réussi : Redirection ou traitement des données de réponse
      console.log(response.data); // Affiche la réponse du backend
      
    } catch (error) {
      // Erreur : Gérer l'erreur de connexion
      console.error("Error during sign up:", error.response.data.error);
    }
  };

  return (
    <CoverLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Register with
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={2}>
          <Socials />
        </ArgonBox>
        <ArgonBox px={12}>
          <Separator />
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </ArgonBox>
            <ArgonBox mb={2}>
  <select value={role} onChange={(e) => setRole(e.target.value)}>
    <option value="pharmacien">Pharmacien</option>
    <option value="admin">Administrateur</option>
  </select>
</ArgonBox>

            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton variant="gradient" color="dark" fullWidth onClick={handleSignUp}>
                sign up
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
