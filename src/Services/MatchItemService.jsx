import axios from "axios";


const Match_URL="http://localhost:9595/lostfound/match";


    export const saveMatchItem= (matchItem)=> {
		return axios.post(Match_URL,matchItem,{
            withCredentials:true
        })
	}

		
		export const getAllMatchItems =() =>{
		return axios.get(Match_URL,{
            withCredentials:true
        });

		}