import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Separator from "layouts/authentication/components/Separator";

const bgImage =
  "https://img.freepik.com/photos-gratuite/covid-nature-morte-vaccin_23-2149079582.jpg?w=1380&t=st=1709150841~exp=1709151441~hmac=3bd6c0cacb562ce689436580bfe9e40aa30b9cdebd82ca1591fdf145d7b58643";

function AddMedicament() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomMed: "",
    descmed: "",
    dateEx: "",
    tempMin: "",
    typeMed: "",
    idUserMed: "",
    idetagemed: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Effacer les erreurs si l'utilisateur commence à retaper
    setErrors({ ...errors, [name]: "" });
  };

  function validateForm() {
    const errors = {};
    if (!formData.nomMed) {
      errors.nomMed = "Veuillez saisir le nom du médicament";
    }
    if (!formData.descmed) {
      errors.descmed = "Veuillez saisir la description du médicament";
    }
    if (!formData.dateEx) {
      errors.dateEx = "Veuillez sélectionner la date d'expiration du médicament";
    }
    if (!formData.tempMin) {
      errors.tempMin = "Veuillez saisir la température minimale du médicament";
    }
    if (!formData.typeMed) {
      errors.typeMed = "Veuillez sélectionner le type de médicament";
    }
    if (!formData.idUserMed) {
      errors.idUserMed = "Veuillez saisir l'identifiant de l'utilisateur";
    }
    if (!formData.idetagemed) {
      errors.idetagemed = "Veuillez saisir l'identifiant de l'étage";
    }
    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Données à envoyer :", formData);
      axios
        .post("http://localhost:8081/addmed", formData)
        .then((res) => {
          console.log("Réponse du serveur :", res.data);
          navigate("/listmed");
        })
        .catch((err) => console.error("Erreur lors de l'envoi de la requête POST :", err));
    } else {
      setErrors(formErrors);
    }
  }

  return (
    <CoverLayout
      title="Add Medicament"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Add Medicament
          </ArgonTypography>
        </ArgonBox>

        <ArgonBox px={4}>
          <Separator />
        </ArgonBox>

        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form" onSubmit={handleSubmit}>
            <ArgonBox mb={2}>
              <ArgonInput
                placeholder="nommed"
                name="nomMed"
                onChange={handleChange}
                error={errors.nomMed}
              />
            </ArgonBox>
            {errors.nomMed && (
              <ArgonTypography variant="caption" color="error">
                {errors.nomMed}
              </ArgonTypography>
            )}
            <ArgonBox mb={2}>
              <ArgonInput
                placeholder="descmed"
                name="descmed"
                onChange={handleChange}
                error={errors.descmed}
              />
            </ArgonBox>
            {errors.descmed && (
              <ArgonTypography variant="caption" color="error">
                {errors.descmed}
              </ArgonTypography>
            )}
            <ArgonBox mb={2}>
              <ArgonInput
                type="date"
                placeholder="dateEx"
                name="dateEx"
                onChange={handleChange}
                error={errors.dateEx}
              />
            </ArgonBox>
            {errors.dateEx && (
              <ArgonTypography variant="caption" color="error">
                {errors.dateEx}
              </ArgonTypography>
            )}
            <ArgonBox mb={2}>
              <ArgonInput
                placeholder="temp min"
                name="tempMin"
                onChange={handleChange}
                error={errors.tempMin}
              />
            </ArgonBox>
            {errors.tempMin && (
              <ArgonTypography variant="caption" color="error">
                {errors.tempMin}
              </ArgonTypography>
            )}
            <ArgonBox mb={2}>
              <select
                name="typeMed"
                value={formData.typeMed}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select typemed</option>
                <option value="Insuline">Insuline</option>
                <option value="Vaccin Rougeole">Vaccin Rougeole</option>
                <option value="Vaccin Diphterie">Vaccin Diphterie</option>
                <option value="Vaccin Hepatite B">Vaccin Hepatite B</option>
              </select>
              {errors.typeMed && (
                <ArgonTypography variant="caption" color="error">
                  {errors.typeMed}
                </ArgonTypography>
              )}
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                placeholder="idUserMed"
                name="idUserMed"
                onChange={handleChange}
                error={errors.idUserMed}
              />
            </ArgonBox>
            {errors.idUserMed && (
              <ArgonTypography variant="caption" color="error">
                {errors.idUserMed}
              </ArgonTypography>
            )}
            <ArgonBox mb={2}>
              <ArgonInput
                placeholder="idetagemed"
                name="idetagemed"
                onChange={handleChange}
                error={errors.idetagemed}
              />
            </ArgonBox>
            {errors.idetagemed && (
              <ArgonTypography variant="caption" color="error">
                {errors.idetagemed}
              </ArgonTypography>
            )}
            <ArgonBox mt={4} mb={1}>
              <ArgonButton variant="gradient" color="dark" fullWidth type="submit">
                ADD
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/listmed"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Consulter La List
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default AddMedicament;
