import { Box, Button, alpha } from '@mui/material';
import {useOnDraw} from './Hooks';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
    
const Canvas = ({
    width,
    height,
    src
}) => {

    // const [isDrawing,setIsDrawing] = useState(false)
    const{isDrawing,setIsDrawing} = useAppContext()
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const image = new Image();
        
        
        
        ctx.globalAlpha = 1;
        
        ctx.filter = "sepia(0.8)"
    
      }, []);

    const {
        setCanvasRef,
        onCanvasMouseDown,
        clearCanvas  ,   
        canvasRef    
    } = useOnDraw(onDraw);
    

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5);
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {

        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();
        

    }

    
 
    return(<> 
    <Box sx={{pointerEvents:isDrawing?"auto":"none"}}>
        <canvas
        width={width}
        height={height}
        onMouseDown={onCanvasMouseDown}
        style={canvasStyle}
        ref={setCanvasRef}
        
    />
    </Box>
    <Box sx={{position:"absolute",}}>
    
    
     
    </Box>
    </>
    
        
       
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black",
    position:"absolute",
    top:0,
    left:0,
    background:"transparent",
   
     
}