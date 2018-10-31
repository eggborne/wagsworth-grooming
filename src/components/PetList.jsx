import React from 'react';
import Header from './Header';
import Pet from './Pet';
// import { pathToFileURL } from 'url';

var masterPetList = [
  {
    name: 'Megatron',
    sex: 'M',
    breed: ['Chihuahua', 'Pomeranian'],
    size: 'XS',
    weight: 9,
    color: ['Black','Brown'],
    dob: 11092008,
    vaccinationDate: 6042018,
    vaccinationClinicId: 0,
    veterinarianId: 0,
    parentId: 1,
    notes: 'A good boy :)'
  },
  {
    name: 'Cheddar Cheese',
    sex: 'F',
    breed: ['Beagle'],
    size: 'M',
    weight: 9,
    color: ['White','Gold'],
    dob: 8241980,
    vaccinationDate: 8092018,
    vaccinationClinicId: 0,
    veterinarianId: 0,
    parentId: 1,
    notes: 'Slobbers'
  }
];

function PetList() {
  return (
    <div>
      <Header legend={'Pets'}/>
      {masterPetList.map((pet, index) =>
        <Pet name={pet.name}
          sex={pet.sex}
          breed={pet.breed}
          size={pet.size}
          weight={pet.weight}
          color={pet.color}
          dob={pet.dob}
          vaccinationDate={pet.vaccinationDate}
          vaccinationClinicId={pet.vaccinationClinicId}
          veterinarianId={pet.veterinarianId}
          parentId={pet.parentId}
          notes={pet.notes}
          key={index}/>
      )}
    </div>
  );
}

export default PetList;