
// Determine what color corresponds to a Ki value
// of the form "123.123.000"
const getColor = (ki) => {
    const kiNumber = +(ki.replaceAll(".", "")); 
    let color;
    if(kiNumber > 1000000){
        color = "#8c001e";
    }else if(kiNumber > 10000){
        color = "#00558a";
    }else{
        color = "#145d00ff";
    }

    return color;
};

export default {
    getColor
};