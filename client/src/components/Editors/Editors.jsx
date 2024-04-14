import Editor from "@monaco-editor/react";

import styles from "./Editors.module.css";




export const HTMLEditor = (props) => {
  return <CodeEditor mode={"html"} title={"HTML"} {...props} />;
}

export const CSSEditor = (props) => {
  return <CodeEditor mode={"css"} title={"CSS"} {...props} />;
}

/*<AceEditor
        mode={mode}
        theme="twilight"
        name={title}
        onChange={onChange}
        value={value}
        width="100%"
        height="100%"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false, 
      }}/> */

const CodeEditor = ({ mode, title, value, onChange }) => {
  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorTitle}>{title}</div>
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