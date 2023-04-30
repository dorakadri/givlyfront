
import React, { useState } from 'react';

import SimpleUserRoutes from './SimpleUserRoutes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateuserlocation } from '../../../ReduxB/slices/delivery/deliverysSlices';




function SimpleUserProfile() {
 

  return (
  
      <SimpleUserRoutes />

  );
}

export default SimpleUserProfile;
