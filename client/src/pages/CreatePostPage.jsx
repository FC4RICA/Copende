import React, { useEffect, useState, useRef } from 'react';
import { HTMLEditor, CSSEditor } from '../components/shared/Editors.jsx';
import { useDebounce } from '../utils/useDebounce.jsx';
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement, ReflexHandle } from 'react-reflex'
import { Button, Form, Schema, ButtonGroup, IconButton, Input } from 'rsuite';
import styles from './CreatePostPage.module.css'
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';

const { ArrayType, StringType } = Schema.Types;
const model = Schema.Model({
  colors: ArrayType().of(
    StringType().isRequired('Required.')
  )
});

const ErrorMessage = ({ children }) => <span style={{ color: 'red' }}>{children}</span>;
const Cell = ({ children, style, ...rest }) => (
  <td style={{ padding: '2px 4px 2px 0', verticalAlign: 'top', ...style }} {...rest}>
    {children}
  </td>
);

const ColorItem = ({ color, onChange, rowIndex, rowError }) => {
  const handleChangeName = value => {
    onChange(rowIndex, value);
  };

  return (
    <tr>
      <Cell>
        <Input value={color} onChange={handleChangeName} />
        {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
      </Cell>
    </tr>
  );
};

const ColorInputControl = ({ value = [], onChange, fieldError }) => {
  const errors = fieldError ? fieldError.array : [];
  const [colors, setColors] = React.useState(value);
  const handleChangeColors = nextColors => {
    setColors(nextColors);
    onChange(nextColors);
  };
  const handleInputChange = (rowIndex, value) => {
    const nextColors = [...colors];
    nextColors[rowIndex] = value;
    handleChangeColors(nextColors);
  };

  const handleMinus = () => {
    handleChangeColors(colors.slice(0, -1));
  };
  const handleAdd = () => {
    handleChangeColors(colors.concat(['']));
  };
  return (
    <table>
      <thead>
        <tr>
          <Cell>Color Code</Cell>
        </tr>
      </thead>
      <tbody>
        {colors.map((value, index) => (
          <ColorItem
            key={index}
            rowIndex={index}
            color={value}
            rowError={errors[index] ? errors[index].object : null}
            onChange={handleInputChange}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <Cell colSpan={2} style={{ paddingTop: 10 }}>
            <ButtonGroup size="xs">
              <IconButton onClick={handleAdd} icon={<PlusIcon />} />
              <IconButton onClick={handleMinus} icon={<MinusIcon />} />
            </ButtonGroup>
          </Cell>
        </tr>
      </tfoot>
    </table>
  );
};


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

  const formRef = useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    colors: ['']
  });

  const navigate = useNavigate()

  const iframeRef = useRef(null)

  const handleSubmit = () => {
    const iframe = iframeRef.current;
    const screen = iframe.contentWindow.document.body;
    html2canvas(screen).then(
      (canvas) => {
        const base64image = canvas.toDataURL('image/png');
        //send to db
        console.log(base64image, formValue)
        //navigate('/admin')
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
              <Form
                ref={formRef}
                checkTrigger="change"
                onChange={setFormValue}
                onCheck={setFormError}
                formValue={formValue}
                model={model}
                onSubmit={handleSubmit}
                className={styles.formContainer}
              >
                <Form.Control name='colors' accepter={ColorInputControl} fieldError={formError.colors}/>
                <Button className={styles.submitButton} type='submit' appearance='primary' color='cyan' block>
                  Create Post
                </Button>
              </Form>
            </div>
          </ReflexElement>
        </ReflexContainer>
      </div>
  )
}

export default CreatePostPage