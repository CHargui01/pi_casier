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

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function BillingInformation() {
  const [medicaments, setMedicaments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/listmed')
      .then(res => setMedicaments(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDeleteMedicament = (idMed) => {
    setMedicaments(medicaments.filter(medicament => medicament.idMed !== idMed));
  }

  return (
    <Card id="delete-account">
      <ArgonBox pt={3} px={2}>
        <ArgonTypography variant="h6" fontWeight="medium">
          Medicament Information
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox pt={1} pb={2} px={2}>
        <ArgonBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {medicaments.map(medicament => (
            <Bill
              key={medicament.idMed}
              name={medicament.nomMed}
              descmed={medicament.descmed}
              dateEx={medicament.dateEx}
              typeMed={medicament.typeMed}
              tempMin={medicament.tempMin}
              idMed={medicament.idMed}
              onDelete={handleDeleteMedicament} // Passer la fonction de suppression à Bill
            />
          ))}
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default BillingInformation;
