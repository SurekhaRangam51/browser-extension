export const browserReducer=(state,action)=>{
        switch(action.type){
            case "name":
                return {
                    ...state,
                    name:action.payload
                }
                case "time":
                    return {
                    ...state,
                    time:action.payload
                }
                case "message":
                    return{
                        ...state,
                        message:action.payload >=0 && action.payload<12 ? "Good Morning" :action.payload >=12 && action.payload <=17 ? "Good afternoon" :"Good Evening"
                 }
                 case "task":
                    return{
                        ...state,
                        task:action.payload
                    }
                case "clear":
                    return{
                        ...state,
                        task:null
                    }
                
            default :{
                return state
            }
        }
}