import React from 'react'
import {  CameraComponent } from '../Components/Camera'
import { Modal } from 'react-native'

type propTypes={
    show:boolean;
    close:()=>void
}

export const CameraModal =(props:propTypes)  => {
    const {show,close}=props
  return (
    <>
        
        <Modal visible={show} onRequestClose={close}>
            <CameraComponent/>
        </Modal>
    </>
  );
}

