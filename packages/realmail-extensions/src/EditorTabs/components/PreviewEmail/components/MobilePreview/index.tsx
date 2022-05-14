import { IframeComponent, usePreviewEmail } from 'realmail-editor';
import React from 'react';

const MOBILE_WIDTH = 375;
const MOBILE_Height = 750;

import iphoneFrame from './iphone.png';

export function MobilePreview() {
  const { errMsg, reactNode, mobileWidth } = usePreviewEmail();

  if (errMsg) {
    return (
      <div style={{ textAlign: 'center', fontSize: 24, color: 'red' }}>
        {errMsg}
      </div>
    );
  }

  return (
    <div
      className="realmail-overlay"
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '10px 0px',
      }}
    >
      <div
        style={{
          position: 'relative',
          margin: 'auto',
          padding: '6px 6.8px 2px 6.8px',
        }}
      >
        <div
          style={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            padding: '6px 6.8px 2px 6.8px',
            backgroundImage: `url(${iphoneFrame})`,
            backgroundSize: '100% 100%',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            width: MOBILE_WIDTH,
            height: MOBILE_Height,
          }}
        >
          <div
            style={{
              height: MOBILE_Height / (MOBILE_WIDTH / mobileWidth),
              width: mobileWidth,
              boxSizing: 'content-box',
              borderRadius: 30,
              border: 'none',
              transform: `scale(${MOBILE_WIDTH / mobileWidth})`,
              transformOrigin: 'left top',
              overflow: 'hidden',
            }}
          >
            <IframeComponent
              style={{
                width: '100%',
                height: 'calc(100%)',
              }}
            >
              {reactNode}
              <style>
                {`

                *::-webkit-scrollbar {
                  -webkit-appearance: none;
                  width: 0px;
                }
                *::-webkit-scrollbar-thumb {
                  background-color: rgba(0, 0, 0, 0.5);
                  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
                  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
                }


        `}
              </style>
            </IframeComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
