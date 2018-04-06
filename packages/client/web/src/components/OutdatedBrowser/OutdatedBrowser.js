/* eslint-disable react/no-danger */
import React from 'react';
import theme from '@pesposa/client-core/src/config/theme';

const OutdatedBrowser = () => (
  <React.Fragment>
    <style
      type="text/css"
      dangerouslySetInnerHTML={{
        __html: `
          .buorg {
            background-color: ${theme.palette.primary.light};
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          }
        `,
      }}
    />
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
            var $buoop = {notify:{e:11,f:-4,o:-4,s:8,c:-4},insecure:true,api:5,style:"corner",reminder: 48};
            function $buo_f(){
            var e = document.createElement("script");
            e.src = "//browser-update.org/update.min.js";
            document.body.appendChild(e);
            };
            try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
            catch(e){window.attachEvent("onload", $buo_f)}`,
      }}
    />
  </React.Fragment>
);

export default OutdatedBrowser;
