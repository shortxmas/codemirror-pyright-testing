// import React from 'react';
// import CodeMirror from '@uiw/react-codemirror';
// // import 'codemirror/lib/codemirror.css';
// // import 'codemirror/theme/material.css';
// // import 'codemirror/mode/python/python';

// function App() {
//   return (
//     <div className="App">
//       <h1>Python Code Editor</h1>
//       <CodeMirror
//         value="# Write your Python code here"
//         options={{
//           mode: 'python',
//           theme: 'material',
//           lineNumbers: true,
//         }}
//         onChange={(editor, data, value) => {
//           console.log(value);
//         }}
//       />
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useRef } from 'react';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { languageServer } from 'codemirror-languageserver';


function App() {
  const editor = useRef(null);
  
 

  useEffect(() => {
    const serverUri = 'ws://localhost:4600'
 
    const ls = languageServer({
      serverUri,
      languageId: 'python',
      
    });

    const startState = EditorState.create({
      doc: "# Write your Python code here",
      extensions: [basicSetup,ls]
    });

    const view = new EditorView({
      state: startState,
      parent: editor.current
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="App">
      <h1>Python Code Editor</h1>
      <div ref={editor}></div>
    </div>
  );
}

export default App;
