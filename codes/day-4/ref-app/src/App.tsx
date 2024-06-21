import { Ref, useEffect, useRef } from 'react';
import './App.css';
import Nested from './Nested';

function App() {
  const refToInput: Ref<HTMLInputElement> = useRef<HTMLInputElement>(null)

  useEffect(
    () => {
      if (refToInput != null) {
        refToInput.current?.focus()
      }
    }
  )
  return (
    <div className="App">
      <Nested value={10} ref={refToInput} />
    </div>
  );
}

export default App;
