import React from 'react';
import './App.scss';
import { ChordComponent } from './chord';
import { MajorScale } from './scales';
import { getMotionsOptionsFor, MotionOptionComponent } from './motionOption';

const App: React.FC = () => {
  return (
    <div className="App">
      { MajorScale.map((chord) => (
          <div>
            <ChordComponent chord={chord} />
            can go to
            {
              getMotionsOptionsFor(chord, MajorScale).map((option) => <span><MotionOptionComponent option={option} />,</span>)
            }
          </div>
        ))
      }
    </div>
  );
}

export default App;
