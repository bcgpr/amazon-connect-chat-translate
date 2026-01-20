import { Amplify }  from '@aws-amplify/core';
import awsconfig from './aws-exports';
import React, { useState, useEffect } from 'react';
import './App.css';
import 'semantic-ui-less/semantic.less';
import Ccp from './components/ccp';

// Component
function App() {
  const [isConfigured, setIsConfigured] = useState(false);
  
  useEffect(() => {
    configureAuth();
  }, []);

  const configureAuth = () => {
    Amplify.configure(awsconfig);
    setIsConfigured(true);
  };

  return (
    <div className="App">
      {isConfigured && <Ccp />}
    </div>
  );
}

export default App;