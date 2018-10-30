import React from "react";
import Header from "./Header";
import AppointmentList from "./AppointmentList";

function App(){
  return (
    <div>
      <Header legend={"Wagsworth Grooming Co."}/>
      <br />
      <Header legend={"Appointments"}/>
      <AppointmentList/>
    </div>
  );
}

export default App;