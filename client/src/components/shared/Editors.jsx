import Editor from "@monaco-editor/react";



export const HTMLEditor = (props) => {
  return <CodeEditor mode={"html"} {...props} />;
}

export const CSSEditor = (props) => {
  return <CodeEditor mode={"css"} {...props} />;
}


const CodeEditor = ({ mode, value, onChange }) => {
  return (
    <div style={{height: '100%', maxHeight: '100%', display: 'flex'}}>
      <Editor
      height='100%'
      width='100%'
      language={mode}
      theme='vs-dark'
      value={value}
      onChange={onChange}
      options={{
        minimap: {
          enabled: false,
        },
      }}
      />
    </div>
  )
}