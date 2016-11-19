export function getObjectFromArray(array,id){        
    for(var i = 0;i<array.length;i++){
        if(array[i]._id == id){
            return array[i];
        }
    }
    return null;
}