import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/appContext";
 
export function useOnDraw(onDraw) {
    const{canvasRef,setCanvasRef} = useAppContext()

    // const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);
    const prevPointRef = useRef(null);


    const mouseMoveListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);

    // function setCanvasRef(ref) {
    //     canvasRef.current = ref;
    // }

    function onCanvasMouseDown() {
        isDrawingRef.current = true;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.globalAlpha = 1; // Set alpha value to 0.5 for 50% transparency

      }, []);

    useEffect(() => {
        function computePointInCanvas(clientX, clientY) {
            if (canvasRef.current) {
                const boundingRect = canvasRef.current.getBoundingClientRect();
                return {
                    x: clientX - boundingRect.left,
                    y: clientY - boundingRect.top
                }
            } else {
                return null;
            }

        }


        function initMouseMoveListener() {
            const mouseMoveListener = (e) => {
                if (isDrawingRef.current && canvasRef.current ) {
                    const point = computePointInCanvas(e.clientX, e.clientY);
                    const ctx = canvasRef.current.getContext('2d');
                    if (onDraw) onDraw(ctx, point, prevPointRef.current);
                    prevPointRef.current = point;
                    console.log(point);
                }
            }
            mouseMoveListenerRef.current = mouseMoveListener;
            window.addEventListener("mousemove", mouseMoveListener);
        }

        function initMouseUpListener() {
            const listener = () => {
                isDrawingRef.current = false;
                prevPointRef.current = null;
            }
            mouseUpListenerRef.current = listener;
            window.addEventListener("mouseup", listener);
        }

        function cleanup() {
            if (mouseMoveListenerRef.current) {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current);
            }
            if (mouseUpListenerRef.current) {
                window.removeEventListener("mouseup", mouseUpListenerRef.current);
            }
        }

        initMouseMoveListener();
        initMouseUpListener();
        return () => cleanup();

    }, [onDraw]);

    function clearCanvas(width,height){
        console.log("clear canvas")
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0,0,width,height)



    }



    return {
        setCanvasRef,
        canvasRef,
        onCanvasMouseDown,
        clearCanvas,


    }


};



