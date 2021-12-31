// main function

const convertColorFormat = (color) => {
    if(isHex(color)) {return hexToRgb(color)}
    if(isRgb(color)) {return rgbToHex(color)}
    return "invalid color"
}

// format test/validation functions

const isHex = (color) => {
   let hex = /#[0-9A-F]{6}$/i;
   return hex.test(color);
}

const isRgb = (color) => {
    let regex = /rgb\([0-9]+,\s?[0-9]+,\s?[0-9]+\)/i;
    
    if(!regex.test(color)) {return false}

    const rgb = getColorGroups(color, "rgb");

    return rgb[0] <= 255 && rgb[1] <= 255 && rgb[2] <= 255
}

// parses individual red, green, and blue values from either a hex or rgb format

const getColorGroups = (color, codeFormat) => {

    let regex;
    
    if(codeFormat === "rgb") {
        regex = /rgb\(([0-9]+),\s?([0-9]+),\s?([0-9]+)\)/i;
    }

    if(codeFormat === "hex") {
        regex = /#(..)(..)(..)/i;
    }
    
    return  [
            color.match(regex)[1],
            color.match(regex)[2],
            color.match(regex)[3]
            ]
}

// conversion functions

const hexToRgb = (hex) => {
    
    const colorVals = getColorGroups(hex, "hex").map(val => parseInt(val, 16));

    return `rgb(${colorVals[0]}, ${colorVals[1]}, ${colorVals[2]})`

}

const rgbToHex = (rgb) => {
    const colorVals = getColorGroups(rgb, "rgb").map(val => {
        
        if(val <= 16) {return "0" +  Number(val).toString(16)}
        return Number(val).toString(16);
    });

    return "#" + colorVals[0] + colorVals[1] + colorVals[2]
}



