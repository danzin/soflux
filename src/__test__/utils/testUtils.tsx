import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../../context/AuthContext';
import { QueryProvider } from '../../lib/react-query/queryProvider';

import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

//interface for Wrapper's props
interface WrapperProps {
  children?: React.ReactNode;
}
afterEach(() => {
  cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
  //custom Wrapper
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <BrowserRouter>
      <QueryProvider>
         <AuthProvider>{children}</AuthProvider>
       </QueryProvider>
     </BrowserRouter>
   );
   //rtlRender provided by react's testing-library renders the component into a virtual DOM making it available for testing
   //ui - the react component being rendered
   //wrapper: Wrapper - providing the aforementioned custom wrapper
   // ...options - any additional options specified when calling the render function
   return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }