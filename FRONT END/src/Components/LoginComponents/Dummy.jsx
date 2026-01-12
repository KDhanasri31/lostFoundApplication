import React, {useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
const Dummy = () => {
    let navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        if(param.pid==='1')
        navigate("/LostItemEntry");
    else if(param.pid==='2')
        navigate("/FoundItemEntry");
    }, [navigate, param]);

}

export default Dummy;