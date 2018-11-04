import React from 'react';
import SectionHeading from './SectionHeading';
import EmployeeCard from './EmployeeCard';
import PropTypes from 'prop-types';

function EmployeeIndex(props) {

  let employeesToDisplay = props.employeeList;
  return (
    <div>
      <SectionHeading type={'employee'}/>
      {employeesToDisplay.map((employee, index) =>
        <EmployeeCard key={index}
          firstName={employee.firstName}
          lastName={employee.lastName}
          schedule={employee.schedule}
          phoneNumber={employee.phoneNumber}
          email={employee.email}
          notes={employee.notes}
          petIds={employee.petIds}
          upcomingApptIds={employee.upcomingApptIds}
          pastApptIds={employee.pastApptIds}
          dateCreated={employee.dateCreated}
          formattedTimeSince={employee.formattedTimeSince} />
      )}
    </div>
  );

}

EmployeeIndex.propTypes = {
  employeeList: PropTypes.array
};

export default EmployeeIndex;