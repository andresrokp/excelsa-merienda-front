import React, {useEffect, useState} from 'react';

export const LayoutAuth = ( {children} ) => {
    
    const [stSize, setStSize] = useState(window.innerWidth)
    useEffect(() => {
      function handleResize() {
        setStSize(window.innerWidth);
      }
      window.addEventListener('resize', handleResize)
    })

    return (
    <div className="row justify-content-center">
        <div className="mb-3 col-12 col-md-3 col-lg-2">
            {stSize < 765 ? <img className="img-fluid" src={'https://firebasestorage.googleapis.com/v0/b/db-bocadopoder.appspot.com/o/logo-excelsa-edit.PNG?alt=media&token=16cccc6a-b1cb-4b5d-83ed-08f5175f4ae1'} alt="logo"/>
                          : <img className="img-fluid" src={'https://firebasestorage.googleapis.com/v0/b/db-bocadopoder.appspot.com/o/logo-excelsa-vert.png?alt=media&token=3397f8f1-39c4-4297-8e36-25cc5bf88dad'} alt="logo2"/>}
        </div>
            <div className="mb-3 col-12 col-md-6">
                {children}
            </div>
        <div className="mb-3 col-12 col-md-3 col-lg-2">
          <img className="img-fluid" src={'https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'} alt="crowd-cafe-unsplash"/>
          <img className="img-fluid" src={'https://images.unsplash.com/photo-1556742521-9713bf272865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'} alt=""/>
        </div>
    </div>

    )
}
