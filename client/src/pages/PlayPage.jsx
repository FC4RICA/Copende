import { useEffect, useState } from "react";
import { HTMLEditor, CSSEditor } from "../components/Editors/Editors.jsx";
import styles from "./PlayPage.module.css";
import { useDebounce } from "../utils/useDebounce.jsx";
import SplitPane, { Pane, SashContent } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';


const PlayPage = () => {
  const [htmlValue, setHtmlValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  // use debounce to change the debouced value only when normal value stop changing for 1 s
  const deboucedHtml = useDebounce(htmlValue, 500);
  const deboucedCss = useDebounce(cssValue, 500);
  
  const logcode = () => {
    console.log(htmlValue)
    console.log(cssValue)
  }

  useEffect(() => {
    setOutputValue(
      `<html>
      <style>
      ${deboucedCss}
      </style>
      <body>
      ${deboucedHtml}
      </body>
    </html>`
    );
  }, [deboucedHtml, deboucedCss])

  const [sizes, setSizes] = useState(['auto', 'auto', 'auto']);

  return (
    <>
      <div className={styles.paneContainer}>
        <SplitPane
          split='vertical'
          sizes={sizes}
          onChange={(sizes) => setSizes(sizes)}
        >
          <Pane minSize={16}>
            <HTMLEditor value={htmlValue} onChange={setHtmlValue} />
          </Pane>
          <Pane>
            <CSSEditor value={cssValue} onChange={setCssValue} />
          </Pane>
          <Pane>
            <div>
              <iframe srcDoc={outputValue} className={styles.preview}/>
            </div>
          </Pane>
        </SplitPane>
      </div>
    </>
  )
}

export default PlayPage;
