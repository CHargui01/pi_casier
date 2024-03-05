/* eslint-disable react/prop-types */
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBadge from "components/ArgonBadge";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Images
import team2 from "assets/images/team-2.jpg";

function Author({ image, name, email }) {

  const [etages, setEtages] = useState([]);
  const [medicaments, setMedicaments] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8081/detailetage')
      .then(res => setEtages(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (idetage) => {
    try {
      await axios.delete(`http://localhost:8081/etagedel/${idetage}`);
      setEtages(etages.filter(etage => etage.idetage !== idetage));
    } catch (err) {
      console.log(err);
    }
  }

  const handleDisplay = async (idetage) => {
    try {
      console.log("ID de l'étage :", idetage);
      const response = await axios.get(`http://localhost:8081/listmed/${idetage}`);
      console.log(response.data); // Afficher les données récupérées dans la console
      // Mettre à jour l'état local des médicaments avec les données récupérées
      setMedicaments({ [idetage]: response.data });
    } catch (err) {
      console.error('Error displaying medication list:', err);
    }
  }
  

  return (
    <>
      <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
        <ArgonBox mr={2}>
          <ArgonAvatar src={image} alt={name} size="sm" variant="rounded" />
        </ArgonBox>
        <ArgonBox display="flex" flexDirection="column">
          <ArgonTypography variant="button" fontWeight="medium">
            {name}
          </ArgonTypography>
          <ArgonTypography variant="caption" color="secondary">
            {email}
          </ArgonTypography>
        </ArgonBox>

        {/* Tableau des étages */}
        <table className='table'>
          <thead>
            <tr>
              <th>Nom Etage</th>
              <th>Temp</th>
              <th>Poid</th>
              <th>ID casier</th>
              <th>Date d&apos;expiration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {etages.map((etage, i) => (
              <tr key={i}>
                <td>{etage.nometage}</td>
                <td>{etage.temp}</td>
                <td>{etage.poid}</td>
                <td>{etage.idcasetage}</td>
                <td>
                  <button className='btn btn-danger ms-2' onClick={() => handleDelete(etage.idetage)}>Delete</button>
                  <button className='btn btn-danger ms-2' onClick={() => handleDisplay(etage.idetage)}>Afficher Médicaments</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ArgonBox>

      {/* Deuxième tableau pour afficher la liste des médicaments */}
      <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
        <table className='table'>
          <thead>
            <tr>
              <th>ID Médicament</th>
              <th>Nom Médicament</th>
              <th>Description</th>
              <th>Date d&apos;expiration</th>
              <th>Température Min</th>
              <th>Type</th>
              <th>ID Utilisateur</th>
              <th>ID Etage</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(medicaments).map((idEtage) => (
              medicaments[idEtage].map((medicament, i) => (
                <tr key={i}>
                  <td>{medicament.idMed}</td>
                  <td>{medicament.nomMed}</td>
                  <td>{medicament.descmed}</td>
                  <td>{medicament.dateEx}</td>
                  <td>{medicament.tempMin}</td>
                  <td>{medicament.typeMed}</td>
                  <td>{medicament.idUserMed}</td>
                  <td>{medicament.idetagemed}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </ArgonBox>
    </>
  );
}

function Function({ job, org }) {
  return (
    <ArgonBox display="flex" flexDirection="column">
      <ArgonTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </ArgonTypography>
      <ArgonTypography variant="caption" color="secondary">
        {org}
      </ArgonTypography>
    </ArgonBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "author", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      author: <Author image={team2} name="J" email="" />,
      function: <Function job="Manager" org="Organization" />,
      status: (
        <ArgonBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      employed: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </ArgonTypography>
      ),
      action: (
        <ArgonTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </ArgonTypography>
      ),
    }
  ],
};

export default authorsTableData;
