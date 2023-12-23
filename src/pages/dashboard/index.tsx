import React from 'react';
import { Space } from '@arco-design/web-react';
import MultipleCharts from '@/pages/dashboard/element/multiple-charts';
import styles from './index.module.less';

function Workplace() {
  return (
    <div className={styles.wrapper}>
      <Space size={24} direction="vertical" className={styles.left}>
        <MultipleCharts />
      </Space>
    </div>
  );
}

export default Workplace;
