import React, { useEffect, useState, useRef } from 'react';
import { HTMLEditor, CSSEditor } from '../components/shared/Editors.jsx';
import { useDebounce } from '../utils/useDebounce.jsx';
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement, ReflexHandle } from 'react-reflex'
import { Button } from 'rsuite';
import styles from './CreatePostPage.module.css'
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const [htmlValue, setHtmlValue] = useState('');
  const [cssValue, setCssValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const deboucedHtml = useDebounce(htmlValue, 500);
  const deboucedCss = useDebounce(cssValue, 500);

  useEffect(() => {
    setOutputValue(
      `<html>
      <style>
      ${"body {overflow: hidden !important;} html, body{ padding: 0; margin: 0; height: 100%;}"+deboucedCss}
      </style>
      <body>
      ${deboucedHtml}
      </body>
    </html>`
    );
  }, [deboucedHtml, deboucedCss])

  const navigate = useNavigate()

  const iframeRef = useRef(null)

  const handleSubmit = () => {
    const iframe = iframeRef.current;
    const screen = iframe.contentWindow.document.body;
    html2canvas(screen).then(
      (canvas) => {
        const base64image = canvas.toDataURL('image/png');
        //send to db
        console.log(base64image)
        navigate('/admin')
      }
    )
  }

  return(
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

          <ReflexElement className={styles.reflexElement} maxSize={424}>
            <div className={styles.previewContainer}>
              <iframe srcDoc={outputValue} className={styles.preview} ref={iframeRef}/>
              <Button onClick={handleSubmit} className={styles.submitButton} appearance='primary' color='cyan' block>Create Post</Button>
            </div>
          </ReflexElement>
        </ReflexContainer>
      </div>
  )
}

export default CreatePostPage