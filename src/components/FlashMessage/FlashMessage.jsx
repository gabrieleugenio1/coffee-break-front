import "./styles.css"
import { useEffect, useState } from "react";


export default function FlashMessage({type, msg}){

    const [visible, setVisible] = useState(false);

    useEffect(()=>{

        if(!msg){
            setVisible(false);
            return;
        };

        setVisible(true);
        
        const timer = setTimeout(() => {
            setVisible(false);
        }, 4000);

        return () => clearTimeout(timer);
    },[msg]);

    return(
        <>
            {visible &&(  
                <div className="flashmessage">
                    <p className={`${type}`}>{msg}</p>               
                </div> 
                ) 
            }
        </>
    );
};