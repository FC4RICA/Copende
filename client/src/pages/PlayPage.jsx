import React, { useEffect, useState, useRef } from 'react';
import { HTMLEditor, CSSEditor } from '../components/shared/Editors.jsx';
import { useDebounce } from '../utils/useDebounce.jsx';
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement, ReflexHandle } from 'react-reflex'
import { Button } from 'rsuite';
import styles from './PlayPage.module.css';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../api/axios.jsx';
import ColorCode from '../components/shared/ColorCode.jsx'

const post = {
  id: 0,
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
  data: {},
}

const PlayPage = () => {
  const [postData, setPostData] = useState({
    postImage: {
      name: ""
    },
    data: []
  })
  const { postId } = useParams();
  const getPostData = async () => {
    try {
      const response = await axiosInstance.get('api/user/post/getPostByPostID?postId=' + postId);
      console.log(response);
      setPostData(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPostData();
  }, [])
  
  const [htmlValue, setHtmlValue] = useState('');
  const [cssValue, setCssValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const deboucedHtml = useDebounce(htmlValue, 500);
  const deboucedCss = useDebounce(cssValue, 500);

  //get target data

  useEffect(() => {
    setOutputValue(
      `<html>
      <style>
      ${"body {overflow: hidden !important;} html, body{ padding: 0; margin: 0; height: 100%;}" + deboucedCss}
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
        //send to db
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

          <ReflexElement className={styles.reflexElement} maxSize={424}>
            <div className={styles.previewContainer}>
              <iframe srcDoc={outputValue} className={styles.preview} ref={iframeRef}/>
              <img className={styles.target} src={postData.postImage.name}/>
              <Button onClick={handleSubmit} className={styles.submitButton} appearance='primary' color='cyan' block>Submit</Button>
            </div>
          </ReflexElement>


          <ReflexSplitter propagate={true} className={styles.reflexSplitter}>
            <ReflexHandle className={styles.reflexHandle}>
              TARGET
            </ReflexHandle>
          </ReflexSplitter>

          <ReflexElement className={styles.reflexElement} maxSize={424}>
            <div className={styles.targetContainer}>
              <img className={styles.target} src={postData.postImage.name} />
              <div className={styles.colorList}>
                {
                  postData.data.map((i, k) => {
                    return <ColorCode color={i} key={k} />
                  })
                }
              </div>
            </div>
          </ReflexElement>
        </ReflexContainer>
      </div>
    </>
  )
}

export default PlayPage;
