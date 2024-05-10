import React, { useState } from 'react';
import './index.css';

import botSVG from './assets/bot.svg';

function App() {
  const [output, setOutput] = useState('');
  const [closeButtonVisible, setCloseButtonVisible] = useState(false);
  const [shareButtonVisible, setShareButtonVisible] = useState(false);
  const [resultsButtonVisible, setResultsButtonVisible] = useState(false);
  const [infoButtonVisible, setInfoButtonVisible] = useState(false);
  const [generateButtonLabel, setGenerateButtonLabel] = useState('Hi, I am Lottobot.');

  function generateNumbers() {
    const pick3Digits = [
      generateFrequentNumber([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [8, 2, 3]),
      generateFrequentNumber([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [8, 2, 3]),
      generateFrequentNumber([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [8, 2, 3])
    ];

    const cash5Numbers = Array.from({ length: 5 }, (_, i) =>
      generateFrequentNumber(Array.from({ length: 32 }, (_, j) => j + 1), [23, 26, 22])
    );

    const powerballNumbers = Array.from({ length: 5 }, (_, i) =>
      generateFrequentNumber(Array.from({ length: 69 }, (_, j) => j + 1), [69, 57, 62])
    );
    const powerballSpecialNumber = generateRandomNumber(1, 26);

    const luckyForLifeWhiteBalls = Array.from({ length: 5 }, (_, i) =>
      generateFrequentNumber(Array.from({ length: 48 }, (_, j) => j + 1), [44, 45, 46])
    );
    const luckyForLifeGreenBall = generateRandomNumber(1, 18);

    const coloradoLottoNumbers = Array.from({ length: 6 }, (_, i) =>
      generateRandomNumber(1, 40)
    );

    const megaMillionsNumbers = Array.from({ length: 5 }, (_, i) =>
      generateRandomNumber(1, 70)
    );
    const megaMillionsSpecialNumber = generateRandomNumber(1, 25);

    setOutput(`
      lottobot.JesseJesse.com<br />
      Pick 3: [${pick3Digits.join(" ")}] <br/>
      Cash 5: [${cash5Numbers.join(" ")}] <br/>
      Powerball: [${powerballNumbers.join(" ")}] <span style="color:red;">[${powerballSpecialNumber}]</span> <br/>
      Lucky4Life: [${luckyForLifeWhiteBalls.join(" ")}] <span style="color:green;">[${luckyForLifeGreenBall}]</span> <br/>
      Mega Millions: [${megaMillionsNumbers.join(" ")}] <span style="color:yellow;">[${megaMillionsSpecialNumber}]</span> <br/>
      Colorado Lotto+: [${coloradoLottoNumbers.join(" ")}] <br/>
    `);
    setCloseButtonVisible(true);
    setShareButtonVisible(true);
    setResultsButtonVisible(true);
    setInfoButtonVisible(true);
    setGenerateButtonLabel('Generate');
  }

  function generateFrequentNumber(numberPool, frequentNumbers) {
    const randomNumber = generateRandomNumber(0, 9);
    if (frequentNumbers.includes(randomNumber)) {
      return randomNumber;
    } else {
      return numberPool[generateRandomNumber(0, numberPool.length - 1)];
    }
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

 function showInfo() {
  const ticketInfo = "Tickets\n\n" +
    "Pick 3: $.50 $1 $2 $5\n" +
    "Cash 5: $1 $2\n" +
    "Powerball: $2\n" +
    "Lucky4LifeLife: $2\n" +
    "Mega Millions: $2\n" +
    "Colorado Lotto+: $1\n\n";

  const drawingTimes = "Drawing Times:\n\n" +
    "Pick 3: twice daily - 13:30 and 19:30\n" +
    "Cash 5: once daily - 19:30\n" +
    "Powerball: Mon. Wed.  Sat. - 21:00\n" +
    "Lucky4Life: 7 days a week - 20:30\n" +
    "Mega Millions: Tuesdays & Fridays - 21:00\n" +
    "Colorado Lotto+: Mon. Wed. Sat. - 19:30\n\n";

  const website = "lottobot.jessejesse.com";

  alert(ticketInfo + drawingTimes + website);
}


  function openWin() {
    const url = "https://www.lotterypost.com/results/co";
    const marginPercentage = 20;
    const iframe = document.createElement("iframe");
    const margin = `${marginPercentage}%`;

    iframe.src = url;
    iframe.style.width = `calc(${window.innerWidth}px - 2 * ${margin})`;
    iframe.style.height = `calc(${window.innerHeight}px - 2 * ${margin})`;
    iframe.style.border = "none";
    iframe.style.position = "fixed";
    iframe.style.top = margin;
    iframe.style.left = margin;
    iframe.style.zIndex = "9999";

    const closeButton = document.createElement("button");
    closeButton.textContent = "x close";
    closeButton.style.position = "fixed";
    closeButton.style.top = "5px";
    closeButton.style.right = "5px";
    closeButton.style.padding = "5px 10px";
    closeButton.style.borderRadius = "20vw";
    closeButton.style.backgroundColor = "#c92a37";
    closeButton.style.color = "#fff";
    closeButton.style.cursor = "pointer";
    closeButton.style.zIndex = "10000";

    closeButton.addEventListener("click", function () {
      document.body.removeChild(iframe);
      document.body.removeChild(closeButton);
    });

    document.body.appendChild(iframe);
    document.body.appendChild(closeButton);
  }

  function shareNumbers() {
    const plainText = output
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\d/g, (match) => match + '\u00A0');

    if (navigator.share) {
      navigator.share({
        title: 'Lottobot.JesseJesse.com',
        text: plainText,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      console.log(plainText);
      alert('Your browser does not support sharing. Here are your numbers:\n' + plainText);
    }
  }

  function closeNumbers() {
    setOutput('');
    setCloseButtonVisible(false);
    setShareButtonVisible(false);
    setResultsButtonVisible(false);
    setInfoButtonVisible(false);
    setGenerateButtonLabel('Lottobot');
  }

  return (
    <div className="app-container">
      <div className="flex flex-col items-center bg-slate-900 justify-center min-h-screen">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative mb-4">
            <img src={botSVG} alt="Bot" className="w-24 h-24" style={{ width: '300px', height: '300px' }} />
          </div>
          <div className="lottery-numbers" dangerouslySetInnerHTML={{ __html: output }}></div>
          <div className="btn-container flex flex-col">
            <button onClick={generateNumbers} className="btn mt-4 border border-green-900 bg-green-900 hover:bg-green-700 text-white 
font-bold 
              py-2 px-4 rounded-full transition duration-300 w-full">{generateButtonLabel}</button>
            {shareButtonVisible && (
              <button onClick={shareNumbers} className="btn mt-4 border-purple-900 bg-purple-900 hover:bg-purple-700 text-white 
                font-bold py-2 px-4 rounded-full transition duration-300 w-full">Share</button>
            )}
            {infoButtonVisible && (
              <button onClick={showInfo} className="btn mt-4 border-gray-400 bg-gray-400 hover:bg-gray-300 text-black font-bold py-2 
                px-4 rounded-full transition duration-300 w-full">Info</button>
            )}
            {resultsButtonVisible && (
              <button onClick={openWin} className="btn mt-4 border-green-900 bg-green-900 hover:bg-green-700 text-white font-bold py-2 
                px-4 rounded-full transition duration-300 w-full">Results</button>
            )}
            {closeButtonVisible && (
              <button onClick={closeNumbers} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition 
                duration-300 mt-4 w-full">Close</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

