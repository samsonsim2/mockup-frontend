// import React, { useRef, useEffect } from 'react';
// import gif from '../blockboy.gif';

// function Sketch() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const img = new Image();
//     img.src = gif;
//     let frameIndex = 0;
//     let requestId;

//     const render = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
//       frameIndex++;
//       if (frameIndex >= img.naturalWidth / canvas.width) {
//         frameIndex = 0;
//       }
//       requestId = requestAnimationFrame(render);
//     };

//     img.onload = () => {
//       requestId = requestAnimationFrame(render);
//     };

//     return () => {
//       cancelAnimationFrame(requestId);
//     };
//   }, []);

//   return (
//     <canvas ref={canvasRef} width={500} height={500} />
//   );
// }

// export default Sketch;
