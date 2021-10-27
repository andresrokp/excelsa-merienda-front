/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React, { Fragment, useState } from 'react'
import { ModalRest } from './ModalRest';


export const BotonRest = ( {...props} ) => {

    //Modal grandpa's managing
    const [openFromF, setOpenFF] = useState(false);
    const handleOpen = () => {
        setOpenFF(true);
    }
    const handleClose = () => setOpenFF(false);

    return (
        <Fragment>
            <button onClick={handleOpen} className="btn btn-primary" type="button">
                {props.btnName}</button>
            <ModalRest {...props} closeFunc={handleClose} openMe={openFromF}/>
            {/* <ModalRest modalName={props.btnName} modalNumber={props.btnNumber}  closeFunc={handleClose} propsBM={props}/> */}
        </Fragment>
    );
}


// useEffect(()=>{
//     if(open){
//         handleOpen();            
//     }else{
//         handleClose();   
//     }
// }, [open])