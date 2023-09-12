import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export function useEventContext() {
  return useContext(EventContext);
}

export function EventContextProvider({ children }) {

  const [booleanState, setBooleanState] = useState(false);

  function toggleBoolean() {
    setBooleanState(prevState => !prevState);
  };

  return (
    <EventContext.Provider 
      value={{ 
        booleanState,
        setBooleanState, 
        toggleBoolean 
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
