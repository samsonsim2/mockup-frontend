import React, { useRef, useEffect, useMemo } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import 'gifler';

const GIF = ({ src }) => {
  const imageRef = useRef(null);
  const canvas = useMemo(() => {
    const node = document.createElement('canvas');
    return node;
  }, []);

  useEffect(() => {
    let anim;
    window.gifler(src).get((a) => {
      anim = a;
      anim.animateInCanvas(canvas);
      anim.onDrawFrame = (ctx, frame) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        imageRef.current.getLayer().draw();
      };
    });
    return () => anim.stop();
  }, [src, canvas]);

  return <Image image={canvas} ref={imageRef} />;
};

const Gif = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <GIF src="https://konvajs.org/assets/yoda.gif" />
      </Layer>
    </Stage>
  );
};

export default Gif;