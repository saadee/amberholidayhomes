/* eslint-disable import/no-extraneous-dependencies */

//---------------------------------------------------------------------
// React, Next and other third-party modules imports
//---------------------------------------------------------------------
import PropTypes from 'prop-types';
import { query, getDocs, collection } from 'firebase/firestore';
import { useMemo, useState, useEffect, useContext, createContext } from 'react';

import { shuffleArray } from 'src/utils/common';
import { useBoolean } from 'src/hooks/use-boolean';

import { DB } from './AuthContext';

export const PropertyContext = createContext({});
export const usePropertyContext = () => useContext(PropertyContext);

// ----------------------------------------------------------------------

export const PropertyProvider = ({ children }) => {
  const isPropertiesLoading = useBoolean();
  const isListingLoading = useBoolean(true);

  // ---------------------------------------------------------------------
  //  Local states
  // ---------------------------------------------------------------------
  const [properties, setProperties] = useState([]);
  const [filterProperties, setFilterProperties] = useState([]);
  const [propertyToView, setPropertyToView] = useState({});

  //--------------------------------------------------------------------
  // Side Effects
  //--------------------------------------------------------------------
  useEffect(() => {
    // get the Property Owners
    getAllProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--------------------------------------------------------------------
  // Callbacks
  //--------------------------------------------------------------------

  const getAllProperties = async () => {
    isPropertiesLoading.onToggle();
    // Reference to the 'properties' collection
    const propertyCollection = collection(DB, 'property');

    // Query to get all documents ordered by 'createdAt' in descending order
    const q = query(propertyCollection);

    try {
      const querySnapshot = await getDocs(q);

      const data = [];

      querySnapshot.forEach((d) => {
        data.push({ id: d.id, ...d.data() });
      });

      const Shuffled = shuffleArray(data);

      setProperties(Shuffled);
      isPropertiesLoading.onToggle();
    } catch (error) {
      isPropertiesLoading.onToggle();
      console.error('Error getting documents: ', error);
    }
  };

  // --------------------------------------------------------------------
  // Return
  // --------------------------------------------------------------------

  const memoizedValue = useMemo(
    () => ({
      properties,
      setProperties,
      filterProperties,
      setFilterProperties,
      isListingLoading,
      propertyToView,
      setPropertyToView,
    }),
    [properties, filterProperties, isListingLoading, propertyToView]
  );
  return <PropertyContext.Provider value={memoizedValue}>{children}</PropertyContext.Provider>;
};

PropertyProvider.propTypes = {
  children: PropTypes.node,
};
