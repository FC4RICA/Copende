import Editor from "@monaco-editor/react";

import styles from "./Editors.module.css";


export const HTMLEditor = (props) => {
  return <CodeEditor mode={"html"} {...props} />;
}

export const CSSEditor = (props) => {
  return <CodeEditor mode={"css"} {...props} />;
}


const CodeEditor = ({ mode, value, onChange }) => {
  return (
    <div className={styles.editorContainer}>
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