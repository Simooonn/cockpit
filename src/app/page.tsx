'use client'
import React from 'react';
import {  Space } from '@arco-design/web-react';
import Overview from './overview';
import styles from './index.css';

function Workplace() {
  return (
      <div className={styles.wrapper}>
        <Space size={24} direction="vertical" className={styles.left}>
          <Overview />
        </Space>
      </div>
  );
}

export default Workplace;
