import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Icon from '@mui/material/Icon';
import ArgonBox from 'components/ArgonBox';
import ArgonTypography from 'components/ArgonTypography';
import ArgonButton from 'components/ArgonButton';
import { Link } from 'react-router-dom';
function Bill({ name, descmed, tempMin, dateEx, typeMed, noGutter, idMed, onDelete }) {
  const handleDelete = async () => {
    // Afficher une alerte de confirmation
    const confirmDelete = window.confirm(`Êtes-vous sûr de supprimer "${name}" ?`);

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/meddel/${idMed}`);
        onDelete(idMed); // Appel de la fonction onDelete avec l'ID du médicament supprimé
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <ArgonBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <ArgonBox width="100%" display="flex" flexDirection="column">
        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={1}
        >
          <ArgonTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </ArgonTypography>

          <ArgonBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <ArgonBox mr={1}>
              {/* Utiliser ArgonButton avec les mêmes styles que le bouton Edit */}
              <ArgonButton variant="text" color="error" onClick={handleDelete}>
                <Icon>delete</Icon>&nbsp;Delete
              </ArgonButton>
            </ArgonBox>
            <Link to={`/updatemed/${idMed}`}>
              <ArgonButton variant="text" color="dark">
                <Icon>edit</Icon>&nbsp;Edit
              </ArgonButton>
            </Link>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox mb={1} lineHeight={0}>
          <ArgonTypography variant="caption" color="text">
            Description:&nbsp;&nbsp;&nbsp;
            <ArgonTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {descmed}
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={1} lineHeight={0}>
          <ArgonTypography variant="caption" color="text">
            Date Expiration:&nbsp;&nbsp;&nbsp;
            <ArgonTypography variant="caption" fontWeight="medium">
              {dateEx}
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={1} lineHeight={0}>
          <ArgonTypography variant="caption" color="text">
            Temp Min:&nbsp;&nbsp;&nbsp;
            <ArgonTypography variant="caption" fontWeight="medium">
              {tempMin}
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
        <ArgonTypography variant="caption" color="text">
          Type De Vaccin:&nbsp;&nbsp;&nbsp;
          <ArgonTypography variant="caption" fontWeight="medium">
            {typeMed}
          </ArgonTypography>
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}

Bill.propTypes = {
  name: PropTypes.string.isRequired,
  descmed: PropTypes.string.isRequired,
  dateEx: PropTypes.string.isRequired,
  typeMed: PropTypes.string.isRequired,
  tempMin: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  idMed: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Bill;
