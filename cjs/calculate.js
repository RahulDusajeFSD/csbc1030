// calculateArea(length, width);

// calculateVolume(length, width, height);

// calculateSquare(length);


function calculateArea(length, width) {
    return length*width;
}

function calculateVolume(length, width, height){
    return length*width*height;
}

function calculateSquare(length){
    return length**2;
}

module.exports.calculateArea = calculateArea;
module.exports.calculateSquare = calculateSquare;
module.exports.calculateVolume = calculateVolume;