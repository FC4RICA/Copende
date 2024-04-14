import { useEffect, useState } from 'react';
import { HTMLEditor, CSSEditor } from '../components/Editors/Editors.jsx';
import { useDebounce } from '../utils/useDebounce.jsx';
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement, ReflexHandle } from 'react-reflex'

import styles from './PlayPage.module.css';


const PlayPage = () => {
  const [htmlValue, setHtmlValue] = useState('');
  const [cssValue, setCssValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

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
        <ReflexContainer orientation='vertical'>
          <ReflexElement className={styles.reflexElement}>
            <HTMLEditor value={htmlValue} onChange={setHtmlValue} />
          </ReflexElement>

          <ReflexSplitter propagate={true} />

          <ReflexElement className={styles.reflexElement} minSize={16}>
            <ReflexHandle className={styles.reflexHandle}>
              CSS
            </ReflexHandle>
            <CSSEditor value={cssValue} onChange={setCssValue} />
          </ReflexElement>

          <ReflexSplitter propagate={true} />

          <ReflexElement className={styles.reflexElement}>
            <div className={styles.previewContainer}>
              <iframe srcDoc={outputValue} className={styles.preview}/>
            </div>
          </ReflexElement>

          <ReflexSplitter propagate={true} />

          <ReflexElement className={styles.reflexElement}>
            <div>
              example
            </div>
          </ReflexElement>
        </ReflexContainer>
      </div>
    </>
  )
}

export default PlayPage;
