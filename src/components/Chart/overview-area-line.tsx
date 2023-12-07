import React from 'react'
import { Spin } from '@arco-design/web-react'

function OverviewAreaLine({
    data,
    loading,
    name = '总内容量',
    color = '#4080FF',
}: {
  data: any[];
  loading: boolean;
  name?: string;
  color?: string;
}) {
    return (
        <Spin loading={loading} style={{ width: '100%' }}>
        </Spin>
    )
}

export default OverviewAreaLine
