import ace from 'ace-builds/src-noconflict/ace';
import AceEditor from "react-ace";
import styles from "./Editors.module.css";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/ext-beautify';


export const HTMLEditor = (props) => {
  return <Editor mode={"html"} title={"HTML"} {...props} />;
}

export const CSSEditor = (props) => {
  return <Editor mode={"css"} title={"CSS"} {...props} />;
}


const Editor = ({ mode, title, value, onChange }) => {
  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorTitle}>{title}</div>
      <AceEditor
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
      }}/>
    </div>
  )
}