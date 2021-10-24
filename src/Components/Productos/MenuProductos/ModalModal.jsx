/*
Por: Andrés Roca
github: @andresrokp
basado en: material-ui dashboard
*/

import React from 'react'
import Modal from '@mui/material/Modal';
import { Registrarproducto } from '../RegistrarProductos/Registrarproducto'

export const ModalModal = ( props ) => {
    
    const handleClose = () => props.closeFunc();
    
    return (
        <Modal
            open={props.openMe}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal-dialog text-start text-black">
                <div className="modal-content">
                    <div className="col-12 modal-header">
                        <h4 className="modal-title" id="myModalLabel">
                            {props.modalName}
                        </h4>
                        <button onClick={handleClose} className="btn-close" type="button" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.modalNumber === 1? <Registrarproducto closeAction={handleClose} isCreate={true} propsMM={props} /> : null}
                        {props.modalNumber === 2? <Registrarproducto closeAction={handleClose} isCreate={false} propsMM={props}/> : null}
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
