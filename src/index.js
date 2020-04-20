import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import styled from '@emotion/styled'

const Container = styled.div(({ width, height }) => ({
        position: 'relative',
        width,
        height,
        borderColor: '#222',
        borderWidth: 1,
        borderStyle: 'solid'
}));

const ColorBubble = styled.div({
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#222',
    borderColor: '#aaa',
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: 'pointer',
}, props => ({
    backgroundColor: props.color
  })
);

export default ({ width = 1280, height = 720 }) => {
    const [brushColor, setBrushColor] = useState('#222')
    const [brushRadius, setBrushRadius] = useState(3)
    const [brushOpacity, setBrushOpacity] = useState(80)

    const fullColor = convertHex(brushColor, brushOpacity)

    const canvasRef = useRef()

    return <Container  width={width} height={height} >
    <CanvasDraw
        backgroundColor = 'white'
        brushRadius = { brushRadius }
        brushColor = {fullColor}
        canvasHeight = { 720 }
        canvasWidth = { 1280 }
        catenaryColor = '#222'
        hideGrid = { true }
        lazyRadius = { 3 }
        ref={canvasRef}
    />
    <Tools
        brushColor={brushColor} setBrushColor={setBrushColor}
        brushRadius={brushRadius} setBrushRadius={setBrushRadius}
        brushOpacity={brushOpacity} setBrushOpacity={setBrushOpacity}
        canvasRef={canvasRef}
    />
</Container>
}

const ToolsContainer = styled.div({
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 16,
});

const colors = [
    '#222222',
    '#FFFFFF',
    '#7DC73F',
    '#F74F47',
    '#F1AE2E',
    '#16B0EA',
    '#F87A33',
    '#FB656F',
    '#AAAAAA'
];

const radiuss = [
    .5,
    1,
    2,
    3,
    5,
    8,
    13,
    21,
    34,
    55
]

const ToolsColumns =  styled.div({
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-end'
})

const ToolColumn =  styled.div({
    display: 'flex',
    flexDirection: 'column',
})

function convertHex(hex,opacity){
    hex = hex.replace('#','');
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);

    return 'rgba('+r+','+g+','+b+','+opacity/100+')';
}


const Tools = ({ canvasRef, brushColor, setBrushColor, brushRadius, setBrushRadius, brushOpacity, setBrushOpacity}) => {
    const [isColorOpen, setColorOpen] = useState(false)
    const [isRadiusOpen, setRadiusOpen] = useState(false)

    return <ToolsContainer>
        <ToolsColumns>
            <ToolColumn>
                { isColorOpen && colors.map(color => 
                    <ColorBubble color={color} onClick={() => {
                        setBrushColor(color);
                        setColorOpen(false);
                    } }/>
                )}
                <ColorBubble color={brushColor} onClick={() => setColorOpen(true) }/>
            </ToolColumn>
            <ToolColumn>
                { isRadiusOpen && radiuss.map(radius => 
                    <RadiusLine radius={radius} onClick={() => {
                        setBrushRadius(radius);
                        setRadiusOpen(false);
                    } }/>
                )}
                <RadiusLine radius={brushRadius} onClick={() => setRadiusOpen(true) } height={62} />
            </ToolColumn>
            <ToolColumn>
                <UndoButton onClick={() => canvasRef.current && canvasRef.current.undo()}>UNDO</UndoButton>
                <UndoButton onClick={() => canvasRef.current && canvasRef.current.clear()}>CLEAR</UndoButton>
            </ToolColumn>
            <ToolColumn>
                <label for="opacity" >Opacity (between 0 and 1):</label>
                <input type="range" name="opacity" min={0} max={100} step={1} value={brushOpacity} onChange={e => setBrushOpacity(e.target.value)} />
            </ToolColumn>
        </ToolsColumns> 
    </ToolsContainer>
}

const UndoButton =  styled.button({})

const RadiusLineContainer = styled.div({
    width: 70, 
    minHeight: 25,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
},
({ radius, height }) => ({
    height: height || radius *3 ,
}))

const RadiusLineContent = styled.div({
    backgroundColor: '#222',
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid'
},
({ radius }) => ({
    height: radius *2 ,
}))



const RadiusLine = ({ radius, onClick, height }) => <RadiusLineContainer height={height} radius={radius} onClick={onClick}><RadiusLineContent radius={radius}/></RadiusLineContainer>