import { Box, Button, alpha } from '@mui/material';
import {useOnDraw} from './Hooks';
import { useEffect, useState } from 'react';
   
const Canvas = ({
    width,
    height,
    src
}) => {

    const [isDrawing,setIsDrawing] = useState(false)
    
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

    

   console.log()

// function adjustments(ctx){
//     console.log(ctx)
//     ctx.filter =`brightness(5%) )`
// }
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
    
    <Button  >Canvas</Button>
    </Box>
    </>
    
        
       
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black",
    background:"transparent",
   
     
}