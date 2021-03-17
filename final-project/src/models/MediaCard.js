/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, jsx } from '@emotion/react';

function MediaCard({name, overview}) {
    const cardStyle = css`
        background-color: #5F9EA0;
        border-radius: 10px;
        margin-top: 8px;
        margin-bottom: 8px;
        margin-left: 8px;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        flex: 0 1 calc(25% - 1em);
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
        p {
            margin-top: 8px;
            margin-bottom: 8px;
            margin-left: 8px;
        }
    `
    return(
        <div css={cardStyle}>
            <p>Name: {name} </p>
            <p>Overview: {overview} </p>
        </div>
    );
}

export default MediaCard;