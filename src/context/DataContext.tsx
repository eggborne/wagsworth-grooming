// import { createContext, useState, useEffect, FC, cache } from 'react';

// type Section {
//   href: string;
//   label: string;
//   // ... other properties like textContent, slides, etc.
// }

// type DataContextType {
//   data: Section[] | null;
// }

// const getData = cache(async () => {
//   console.log('Fetching data...');
//   const dbRef = ref(database);
//   let data = 'No content available';

//   try {
//     const snapshot = await get(child(dbRef, 'sections/'));
//     if (snapshot.exists()) {
//       data = snapshot.val();
//     } else {
//       console.log('No data available');
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   console.log('Data fetched');
//   return data;
// });

// const DataContext = createContext<DataContextType>({ data: null });

// const DataProvider: FC = ({ children }) => {
//   const [data, setData] = useState<Section[] | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getData();
//       setData(response);
//     };

//     fetchData();
//   }, []);

//   return (
//     <DataContext.Provider value={{ data }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export { DataContext, DataProvider };
