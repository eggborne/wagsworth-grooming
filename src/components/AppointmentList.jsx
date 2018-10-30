import React from "react";
import Appointment from "./Appointment"

function AppointmentList(){
  return (
    <Appointment
      parentFirstName={["Deborah","Tyrone"]} 
      parentLastName="Watkins"
      parentPhone={["360-867-5309","800-858-0085"]}
      petName="Megatron"
      petBreed={["Chihuahua","Pomeranian"]}
      apptTime="3:30pm"
      apptDate="Nov. 23"
      apptService={["Kennel cut #10","Deluxe ball-washing"]}
      />
  );
}

export default AppointmentList;