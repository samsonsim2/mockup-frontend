import { Box, Button, alpha } from '@mui/material';
import {useOnDraw} from './Hooks';
import { useState } from 'react';
  
const Canvas = ({
    width,
    height
}) => {

    const [isDrawing,setIsDrawing] = useState(false)
    

    const {
        setCanvasRef,
        onCanvasMouseDown,
        clearCanvas         
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
    <Box sx={{position:"absolute"}}>
    <Button onClick={()=>setIsDrawing(!isDrawing)} >draw</Button>
    <Button onClick={()=>clearCanvas(width,height)} >clear</Button>
    </Box>
    </>
    
        
       
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black",
    background:"transparent",
     
}