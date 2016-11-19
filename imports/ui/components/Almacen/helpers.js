export function getObjectFromArray(array,id){        
    for(var i = 0;i<array.length;i++){
        if(array[i]._id == id){
            return array[i];
        }
    }
    return null;
}

export function removeFromArray(array,obj){        
    var index = array.indexOf(obj);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}