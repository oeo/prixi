// ==UserScript==
// @name         (prixi) google mirror helper
// @description  clean up search results
// @version      1.1
// @author       <taky@taky.com>
// @match        http://localhost:9001/*
// @match        https://localhost:9001/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  // immediately add css to the head of the document to hide unwanted elements
  const cssHideRule = `
    div.Efnghe,
    [aria-label="Ads"],
    div.M8OgIe,
    div.botstuff,
    div.XDyW0e,
    input#gbqfbb,
    div.c93Gbe,
    div#tU52Vb,
    div.zp6Lyf,
    div.cUnQKe,
    div#rhs,
    div.Ne6nSd,
    div#footcnt,
    div.NDnoQ > div.Q3DXx,
    .k1zIA.rSk4se {
      display: none !important;
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = cssHideRule;
  document.head.appendChild(styleSheet);

  function replaceGoogleLogo() {
    return;
    const base64SVG = 'CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjcyIiBoZWlnaHQ9IjkyIj48cGF0aCBmaWxsPSIjMTExMTExIiBkPSJNMTE1Ljc1IDQ3LjE4YzAgMTIuNzctOS45OSAyMi4xOC0yMi4yNSAyMi4xOHMtMjIuMjUtOS40MS0yMi4yNS0yMi4xOEM3MS4yNSAzNC4zMiA4MS4yNCAyNSA5My41IDI1czIyLjI1IDkuMzIgMjIuMjUgMjIuMTh6bS05Ljc0IDBjMC03Ljk4LTUuNzktMTMuNDQtMTIuNTEtMTMuNDRTODAuOTkgMzkuMiA4MC45OSA0Ny4xOGMwIDcuOSA1Ljc5IDEzLjQ0IDEyLjUxIDEzLjQ0czEyLjUxLTUuNTUgMTIuNTEtMTMuNDR6Ii8+PHBhdGggZmlsbD0iIzExMTExMSIgZD0iTTE2My43NSA0Ny4xOGMwIDEyLjc3LTkuOTkgMjIuMTgtMjIuMjUgMjIuMThzLTIyLjI1LTkuNDEtMjIuMjUtMjIuMThjMC0xMi44NSA5Ljk5LTIyLjE4IDIyLjI1LTIyLjE4czIyLjI1IDkuMzIgMjIuMjUgMjIuMTh6bS05Ljc0IDBjMC03Ljk4LTUuNzktMTMuNDQtMTIuNTEtMTMuNDRzLTEyLjUxIDUuNDYtMTIuNTEgMTMuNDRjMCA3LjkgNS43OSAxMy40NCAxMi41MSAxMy40NHMxMi41MS01LjU1IDEyLjUxLTEzLjQ0eiIvPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0yMDkuNzUgMjYuMzR2MzkuODJjMCAxNi4zOC05LjY2IDIzLjA3LTIxLjA4IDIzLjA3LTEwLjc1IDAtMTcuMjItNy4xOS0xOS42Ni0xMy4wN2w4LjQ4LTMuNTNjMS41MSAzLjYxIDUuMjEgNy44NyAxMS4xNyA3Ljg3IDcuMzEgMCAxMS44NC00LjUxIDExLjg0LTEzdi0zLjE5aC0uMzRjLTIuMTggMi42OS02LjM4IDUuMDQtMTEuNjggNS4wNC0xMS4wOSAwLTIxLjI1LTkuNjYtMjEuMjUtMjIuMDkgMC0xMi41MiAxMC4xNi0yMi4yNiAyMS4yNS0yMi4yNiA1LjI5IDAgOS40OSAyLjM1IDExLjY4IDQuOTZoLjM0di0zLjYxaDkuMjV6bS04LjU2IDIwLjkyYzAtNy44MS01LjIxLTEzLjUyLTExLjg0LTEzLjUyLTYuNzIgMC0xMi4zNSA1LjcxLTEyLjM1IDEzLjUyIDAgNy43MyA1LjYzIDEzLjM2IDEyLjM1IDEzLjM2IDYuNjMgMCAxMS44NC01LjYzIDExLjg0LTEzLjM2eiIvPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0yMjUgM3Y2NWgtOS41VjNoOS41eiIvPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Im0yNjIuMDIgNTQuNDggNy41NiA1LjA0Yy0yLjQ0IDMuNjEtOC4zMiA5LjgzLTE4LjQ4IDkuODMtMTIuNiAwLTIyLjAxLTkuNzQtMjIuMDEtMjIuMTggMC0xMy4xOSA5LjQ5LTIyLjE4IDIwLjkyLTIyLjE4IDExLjUxIDAgMTcuMTQgOS4xNiAxOC45OCAxNC4xMWwxLjAxIDIuNTItMjkuNjUgMTIuMjhjMi4yNyA0LjQ1IDUuOCA2LjcyIDEwLjc1IDYuNzIgNC45NiAwIDguNC0yLjQ0IDEwLjkyLTYuMTR6bS0yMy4yNy03Ljk4IDE5LjgyLTguMjNjLTEuMDktMi43Ny00LjM3LTQuNy04LjIzLTQuNy00Ljk1IDAtMTEuODQgNC4zNy0xMS41OSAxMi45M3oiLz48cGF0aCBmaWxsPSIjMTExMTExIiBkPSJNMzUuMjkgNDEuNDFWMzJINjdjLjMxIDEuNjQuNDcgMy41OC40NyA1LjY4IDAgNy4wNi0xLjkzIDE1Ljc5LTguMTUgMjIuMDEtNi4wNSA2LjMtMTMuNzggOS42Ni0yNC4wMiA5LjY2QzE2LjMyIDY5LjM1LjM2IDUzLjg5LjM2IDM0LjkxLjM2IDE1LjkzIDE2LjMyLjQ3IDM1LjMuNDdjMTAuNSAwIDE3Ljk4IDQuMTIgMjMuNiA5LjQ5bC02LjY0IDYuNjRjLTQuMDMtMy43OC05LjQ5LTYuNzItMTYuOTctNi43Mi0xMy44NiAwLTI0LjcgMTEuMTctMjQuNyAyNS4wMyAwIDEzLjg2IDEwLjg0IDI1LjAzIDI0LjcgMjUuMDMgOC45OSAwIDE0LjExLTMuNjEgMTcuMzktNi44OSAyLjY2LTIuNjYgNC40MS02LjQ2IDUuMS0xMS42NWwtMjIuNDkuMDF6Ii8+PC9zdmc+Cg==';
    const logoContainer = document.querySelector('.k1zIA.rSk4se');
    if (logoContainer) {
      logoContainer.innerHTML = `<img src="data:image/svg+xml;base64,${base64SVG}" height="92" width="272">`;
      logoContainer.style.display = 'block!important';
    }
  }

  function removeUnwantedSections() {
    const elementsToRemove = [
      'div.Efnghe',
      '[aria-label="Ads"]',
      'div.M8OgIe',
      'div.botstuff',
      'div.XDyW0e',
      'input#gbqfbb',
      'div.c93Gbe',
      'div#tU52Vb',
      'div.zp6Lyf',
      'div.cUnQKe',
      'div#rhs',
      'div.Ne6nSd',
      'div#footcnt',
      'div.NDnoQ > div.Q3DXx'
    ];

    // perform removal of elements after the dom has been fully parsed
    elementsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        element.style.display = 'none';
        element.remove();
      });
    });
  }

  function replaceHostInLinks() {
    document.querySelectorAll('a').forEach(function(link) {
      try {
        let url = new URL(link.href);
        if (url.host === 'www.google.com') {
          link.href = '/';
        }
        if (url.host === window.location.host && url.pathname === '/webhp') {
          link.href = '/';
        }
      } catch (error) {
        console.error('Error processing link:', link, error);
      }
    });
  }

  function runAllModifications() {
    document.body.style.fontFamily = 'Arial, sans-serif';
    replaceHostInLinks();
    removeUnwantedSections();
    replaceGoogleLogo();
  }

  // run modifications as soon as the dom is ready
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    runAllModifications();
  } else {
    document.addEventListener('DOMContentLoaded', runAllModifications);
  }
})();

