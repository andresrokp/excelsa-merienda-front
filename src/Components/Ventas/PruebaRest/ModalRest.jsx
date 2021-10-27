/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React from 'react'
import Modal from '@mui/material/Modal';
// import { FormaDinamicaVentas } from '../FormaDinamicaVentas';
import { ListaRest } from './ListaRest';

export const ModalRest = ( {closeFunc, openMe, btnName, btnNumber, ...rest} ) => {
    
    const handleClose = () => closeFunc();

    const modalStyle1 = {
            overflow:'scroll',
            position:'absolute',
            top:'10%',
            left:'10%',
            height:'100%',
            display:'block'
        };
    
    return (
        <Modal
            sx={modalStyle1}
            open={openMe}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal-dialog text-start text-black">
                <div className="modal-content">
                    <div className="col-12 modal-header">
                        <h4 className="modal-title" id="myModalLabel">
                            {btnName}
                        </h4>
                        <button onClick={handleClose} className="btn-close" type="button" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* {props.modalNumber === 1? <FormaDinamicaVentas closeAction={handleClose} isCreate={true} propsMM={props} /> : null}
                        {props.modalNumber === 2? <FormaDinamicaVentas closeAction={handleClose} isCreate={false} propsMM={props}/> : null} */}
                        {btnNumber === 3? <ListaRest closeAction={handleClose} isAdd={false} {...rest}/> : null}
                        {btnNumber === 4? <ListaRest closeAction={handleClose} isCarrito={false} {...rest}/> : null}
                        {/* {btnNumber === 7? <ListaRest closeAction={handleClose} isCreate={false} propsMM={props}/> : null}
                        {btnNumber === 8? <ListaRest closeAction={handleClose} isCreate={false} propsMM={props}/> : null} */}
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleClose} className="btn btn-secondary" type="button">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
