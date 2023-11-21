import React from 'react';
import { Spin } from '@arco-design/web-react';
import CustomTooltip from './customer-tooltip';

const areaColorMap = [
  'l (90) 0:rgba(255, 211, 100, 0.5) 1:rgba(255, 235, 52, 0.001)',
  'l (90) 0:rgba(100, 255, 236, 0.5) 1:rgba(52, 255, 243, 0.001)',

  'l (90) 0:rgba(131, 100, 255, 0.5) 1:rgba(80, 52, 255, 0.001)',
  'l (90) 0:rgba(100, 162, 255, 0.5) 1:rgba(52, 105, 255, 0.001)',
];

const lineColorMap = ['#F77234', '#33D1C9', '#722ED1', '#165DFF'];

function MultiAreaLine({ data, loading }: { data: any[]; loading: boolean }) {
  return (
    <Spin loading={loading} style={{ width: '100%' }}>

    </Spin>
  );
}

export default MultiAreaLine;
