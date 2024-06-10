import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Popover, Whisper } from 'rsuite';
import styles from './ColorCode.module.css'
import { useState } from 'react';

const ColorCode = ({ color }) => {
  const [isCopy, setIsCopy] = useState(false)

  return (
    <CopyToClipboard text={color} onCopy={() => setIsCopy(true)}>
      <Whisper placement="top" trigger="click" speaker={<Popover>Copied</Popover>}>
        <button className={styles.colorCodeContainer}>
          <div style={{backgroundColor: color}} className={styles.color}></div>
          <span>{color}</span>
        </button>
      </Whisper>
    </CopyToClipboard>
  )
}

export default ColorCode;