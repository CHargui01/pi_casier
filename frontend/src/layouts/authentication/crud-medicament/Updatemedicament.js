import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Separator from "layouts/authentication/components/Separator";

const bgImage =
  "https://img.freepik.com/photos-gratuite/covid-nature-morte-vaccin_23-2149079582.jpg?w=1380&t=st=1709150841~exp=1709151441~hmac=3bd6c0cacb562ce689436580bfe9e40aa30b9cdebd82ca1591fdf145d7b58643";

function UpdateMedicament() {
  const [formData, setFormData] = useState({
    nomMed: "",
    descmed: "",
    dateEx: "",
    tempMin: "",
    typeMed: "",
    idUserMed: "",
    idetagemed: "",
  });
  const { idMed } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getMedicament/${idMed}`)
      .then((res) => {
        const medData = res.data;
        setFormData({
          nomMed: medData.nomMed,
          descmed: medData.descmed,
          dateEx: medData.dateEx,
          tempMin: medData.tempMin,
          typeMed: medData.typeMed,
          idUserMed: medData.idUserMed,
          idetagemed: medData.idetagemed,
        });
      })
      .catch((err) => console.error("Erreur lors de la récupération des données du médicament :", err));
  }, [idMed]);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/updatemed/${idMed}`, formData)
      .then((res) => {
        console.log("Réponse du serveur :", res.data);
        navigate("/listmed");
      })
      .catch((err) => console.error("Erreur lors de l'envoi de la requête PUT :", err));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <CoverLayout
      title="Update Medicament"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Update Medicament
          </ArgonTypography>
        </ArgonBox>

        <ArgonBox px={4}>
          <Separator />
        </ArgonBox>

        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form" onSubmit={handleSubmit}>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="nommed" name="nomMed" value={formData.nomMed} onChange={handleChange} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="descmed" name="descmed" value={formData.descmed} onChange={handleChange} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="date" placeholder="dateEx" name="dateEx" value={formData.dateEx} onChange={handleChange} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="temp min" name="tempMin" value={formData.tempMin} onChange={handleChange} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <select name="typeMed" value={formData.typeMed} onChange={handleChange} className="form-control">
                <option value="">Select typemed</option>
                <option value="Insuline">Insuline</option>
                <option value="Vaccin Rougeole">Vaccin Rougeole</option>
                <option value="Vaccin Diphterie">Vaccin Diphterie</option>
                <option value="Vaccin Hepatite B">Vaccin Hepatite B</option>
              </select>
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="idUserMed" name="idUserMed" value={formData.idUserMed} onChange={handleChange} />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput placeholder="idetagemed" name="idetagemed" value={formData.idetagemed} onChange={handleChange} />
            </ArgonBox>

            <ArgonBox mt={4} mb={1}>
              <ArgonButton variant="gradient" color="dark" fullWidth type="submit">
                Update
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default UpdateMedicament;
