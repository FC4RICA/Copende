import React, { useEffect, useState, useRef } from 'react';
import { HTMLEditor, CSSEditor } from '../components/shared/Editors.jsx';
import { useDebounce } from '../utils/useDebounce.jsx';
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement, ReflexHandle } from 'react-reflex'
import { Button } from 'rsuite';
import styles from './PlayPage.module.css';
import html2canvas from 'html2canvas';


const PlayPage = () => {
  const [htmlValue, setHtmlValue] = useState('');
  const [cssValue, setCssValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const deboucedHtml = useDebounce(htmlValue, 500);
  const deboucedCss = useDebounce(cssValue, 500);

  useEffect(() => {
    setOutputValue(
      `<html>
      <style>
      ${"body {overflow: hidden !important;}"+deboucedCss}
      </style>
      <body>
      ${deboucedHtml}
      </body>
    </html>`
    );
  }, [deboucedHtml, deboucedCss])


  const iframeRef = useRef(null)

  const handleSubmit = () => {
    const iframe = iframeRef.current;
    const screen = iframe.contentWindow.document.body;
    html2canvas(screen).then(
      (canvas) => {
        const base64image = canvas.toDataURL('image/png');
        console.log(base64image)
      }
    )
  }

  return (
    <>
      <div className={styles.paneContainer} >
        <ReflexContainer orientation='vertical' className={styles.reflexContainer}>
          <ReflexSplitter propagate={true} className={styles.reflexSplitter} style={{pointerEvents: 'none'}}>
            <ReflexHandle className={styles.reflexHandle}>
              HTML
            </ReflexHandle>
          </ReflexSplitter>

          <ReflexElement className={styles.reflexElement}>
            <div className={styles.editorTitleContainer}>
              <div className={styles.editorTitle}>
                HTML
              </div>
            </div>
            <HTMLEditor value={htmlValue} onChange={setHtmlValue} />
          </ReflexElement>


          <ReflexSplitter propagate={true} className={styles.reflexSplitter}>
            <ReflexHandle className={styles.reflexHandle}>
              CSS
            </ReflexHandle>
          </ReflexSplitter>

          <ReflexElement className={styles.reflexElement}>
          <div className={styles.editorTitleContainer}>
              <div className={styles.editorTitle}>
                CSS
              </div>
            </div>
            <CSSEditor value={cssValue} onChange={setCssValue} />
          </ReflexElement>


          <ReflexSplitter propagate={true} className={styles.reflexSplitter}>
            <ReflexHandle className={styles.reflexHandle}>
              PREVIEW
            </ReflexHandle>
          </ReflexSplitter>

          <ReflexElement className={styles.reflexElement}>
            <div className={styles.previewContainer}>
              <iframe srcDoc={outputValue} className={styles.preview} ref={iframeRef}/>
              <Button onClick={handleSubmit} className={styles.submitButton} appearance='primary' color='cyan' block>Submit</Button>
            </div>
          </ReflexElement>


          <ReflexSplitter propagate={true} className={styles.reflexSplitter}>
            <ReflexHandle className={styles.reflexHandle}>
              TARGET
            </ReflexHandle>
          </ReflexSplitter>

          <ReflexElement className={styles.reflexElement}>
            <div className={styles.previewContainer}>
              <iframe srcDoc={outputValue} className={styles.preview}/>
            </div>
          </ReflexElement>
        </ReflexContainer>
      </div>
    </>
  )
}

export default PlayPage;
