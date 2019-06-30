const encodeButton = document.querySelector('#encodeBtn');
const textInput = document.querySelector('#inputText');

encodeButton.addEventListener('click', performSquareCodeOperation);

function performSquareCodeOperation() {
    let userInput = textInput.value;
    // Check that input is compliant to requirements
    if (userInput.length > 50) {
        // Normalize user input
        let splitTextArr = getNormalizedTextArray(normalizeTextInput(userInput))

        // show normalized text in a rectangle
        let rectangularText = getRectangularText(splitTextArr)
        document.querySelector('#normalizedRectangle').innerHTML = rectangularText

        // get encoded chunks and display
        let encodedMsg = getEncodedMsg(splitTextArr)
        document.querySelector('#encoded').textContent = '\"' + encodedMsg + '\"'

        // get encoded chunks in rectangle
        let secondRecText = getRectangularText(encodedMsg.replace(/\s{2}/g, ' ').trim().split(' '))
        document.querySelector('#encodedRectangle').innerHTML = secondRecText
    } else {
        alert("Sorry, Message cannot be encoded. Your entry MUST be 50 OR MORE CHARACTERS LONG!!!")
    }
}

function normalizeTextInput(inpText) {
    let normalText = inpText.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return normalText
}

function getNormalizedTextArray(plainText) {
    let [col, row] = getColumnsAndRows(plainText.length)
    let splitRegex = new RegExp(".{1," + col + "}", 'g');
    let splitTexts = plainText.match(splitRegex)
    
    return splitTexts
}

function getColumnsAndRows(textCount) {
    let squareVal = textCount ** 0.5
    let col = Math.ceil(squareVal)
    let row = Math.floor(squareVal)
    if (col * row < textCount) {
        row = Math.ceil(squareVal)
    }
    return [col, row]
}

function getEncodedMsg(splitTextArray) {
    let curPosition = 0
    let rows = splitTextArray.length
    // the first entry in the array will always be complete and tells the correct column size
    let cols = splitTextArray[0].length
    let encodedChunks = ""
    while (curPosition < cols) {
        let aChunk = ""
        for (let i = 0; i < rows; i++) {
            if (splitTextArray[i][curPosition] != null) {
                aChunk += splitTextArray[i][curPosition];
            } else {
                aChunk += " ";
            }
        }
        if (curPosition < cols - 1) {
            encodedChunks += (aChunk + " ")
        } else {
            encodedChunks += (aChunk)
        }
        curPosition++
    }
    return encodedChunks
}

function getRectangularText(textArray) {
    let splitRectangle = "<span>"
    let col = textArray[0].length
    for (let i = 0; i < textArray.length; i++) {
        // ensure the split string is up to the column length or pad it up
        let aSplit = textArray[i]
        if (aSplit.length < col) {
            aSplit = aSplit.padEnd(col)
        }
        if (i < textArray.length - 1) {
            splitRectangle += '\"' + aSplit + '\"' + "<br />"
        } else {
            splitRectangle += '\"' + aSplit + '\"'
        }
    }
    splitRectangle += "</span>"
    return splitRectangle
}
