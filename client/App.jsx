import React, { useEffect, useState } from 'react';

const App = () => {
  const [hello, setHello] = useState('hello');

  return (
    <div>
      <button className="hello" onClick={() => setHello('goodbye')}>goodbye</button>
      <div>{hello}</div>
    </div>
  )
}

export default App;