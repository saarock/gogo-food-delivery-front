import { useState } from 'react';
import html2canvas from 'html2canvas';

const useScreenshot = () => {

  const takeScreenshot = async () => {
    const element = document.documentElement; // Get the entire document
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL('image/png');
    const aElement = document.createElement("a");
    aElement.href = dataUrl
    aElement.download = "screenshot.png";
    aElement.click()
  };

  return {takeScreenshot };
};

export default useScreenshot;
