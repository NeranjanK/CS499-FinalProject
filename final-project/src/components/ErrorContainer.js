import React from 'react';

import '../styles/ErrorContainer.css';

function ErrorContainer({ children }) {
  return <div className="error-container">{children}</div>
}

export default ErrorContainer;