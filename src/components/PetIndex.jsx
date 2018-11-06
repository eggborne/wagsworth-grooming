import React from 'react';
import SectionHeading from './SectionHeading';
import PetCard from './PetCard';
import PropTypes from 'prop-types';

function PetIndex(props) {
  let petsToDisplay = props.petList;
  return (
    <div>
      <SectionHeading type={'pet'} />
      {petsToDisplay.map((pet, index) =>
        <PetCard name={pet.name}
          breed={pet.breed}
          sex={pet.sex}
          weight={pet.weight}
          notes={pet.notes}
          color={pet.color}
          dob={pet.dob}
          vaccinationDate={pet.vaccinationDate}
          vaccinationClinic={pet.vaccinationClinic}
          veterinarian={pet.veterinarian}
          parent={pet.parent}
          key={index} />
      )}
    </div>
  );
}

PetIndex.propTypes = {
  petList: PropTypes.array,
};

export default PetIndex;