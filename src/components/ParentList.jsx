import React from 'react';
import Parent from './Parent';

var masterParentList = [
  {
    firstNames: ['Deborah', 'Tyrone'],
    lastName: 'Watkins',
    phoneNumbers: ['360-867-5309', '800-858-0085'],
    petIds: [1,2],
    nextApptId: 1,
    pastApptIds: [1],
    notes: 'Kind of snooty',
  },
  {
    firstNames: ['Marcus', 'Buford'],
    lastName: 'Wellington',
    phoneNumbers: ['360-936-5589', '602-354-5735'],
    petIds: [3],
    nextApptId: 2,
    pastApptIds: [2],
    notes: 'Fabulous tippers',
  }
];

function ParentList() {
  return (
    <div>
      {masterParentList.map((parent, index) =>
        <Parent firstNames={parent.firstNames}
          lastName={parent.lastName}
          phoneNumbers={parent.phoneNumbers}
          petIds={parent.petIds}
          nextApptId={parent.nextApptId}
          pastApptIds={parent.pastApptIds}
          notes={parent.notes}
          key={index} />
      )}
    </div>
  );
}

export default ParentList;