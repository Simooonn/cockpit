import React from 'react'
import Router from 'next/router'

function Demo() {

    return (
        <div>
            <div>demo2</div>
            <button onClick={() => history.go(-1)}>Back to Demo</button>
            <button onClick={() => Router.push('/demo')}>go Demo</button>
        </div>
    )
}

export default Demo
