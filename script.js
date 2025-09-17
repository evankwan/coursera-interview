function addRemainderSpaces(line, spacesToAdd) {
    return line.map((word) => {
        // if there is space to add, add a space and decrement the counter
        // could maybe write this with a single return statement but I prefer this method so we don't reassign to same variable if we can help it
        if (spacesToAdd > 0) {
            spacesToAdd--;
            return `${word} ` // only need to add a single space because the remainder will always be less than the total number of spaces between words
        }
        return word
    })
}

function calculateEvenSpaces(spacesNeeded, currentLine) {
    // divide up the spaces evenly if possible Math.floor
    const evenSpaces = Math.floor(spacesNeeded / (currentLine.length - 1))
    // have to account for Infinity edge case if only one word can fit on the line
    // Infinity can happen because we're using length - 1 to determine the even spaces needed, so spacesNeeded/0 = Infinity
    // also the negative number edge case needs to be handled, this can happen when the current word exceeds the limit
    // could break up the words if we wanted but that wasn't really in the spirit of the question so I didn't handle that
    return " " + " ".repeat(Number.isInteger(evenSpaces) && evenSpaces >= 0 ? evenSpaces : 0)
}

function generateCurrentLineWithSpaces(currentLine, L) {
    // calculate the number of spaces needed
    const spacesNeeded = L - currentLine.join(" ").length
    // using % calc the remaining spaces to be added
    const remainingSpaces = spacesNeeded % (currentLine.length - 1)
    // loop through the currentLine and add the extra spaces
    const lineWithRemainderSpaces = addRemainderSpaces(currentLine, remainingSpaces)
    // add the even spaces between each word
    const evenSpaces = calculateEvenSpaces(spacesNeeded, currentLine)
    return lineWithRemainderSpaces.join(evenSpaces)
}

function textJustify(input, L) {
    // split the string into an array
    let answer = ""
    const inputArray = input.split(" ")
    let currentLine = []
    // loop through the array
    inputArray.forEach((word, index) => {
        // if the accumulated characters + 1 for each word is under the limit, add the word to the current line move onto the next word
        const isLineUnderLimit = (currentLine.join(" ").length + word.length) < L // stored this for readability, easier to understand what this is doing when a var name tells you
        if (isLineUnderLimit) {
            currentLine.push(word)
        } else {
            // if you exceed the limit, add the existing words and then a new line
            const currentLineString = generateCurrentLineWithSpaces(currentLine, L)
            answer += `${currentLineString}\n` // thought about extracting this but it's only a single line, felt like over-engineering to me
            // add the new word onto a new line, and continue
            currentLine = [word]
        }
        if (index === inputArray.length - 1) {
            answer += `${currentLine.join(" ")}`
        }
    })
    // return the string
    return answer
}

input = "Coursera provides universal access to the world's best education, partnering with top universities and organizations to offer courses online";
L = 30;

console.log(textJustify(input, L));