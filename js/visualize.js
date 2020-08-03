drawMatrix = (matrix, minReward, maxReward, blockWidth, blockHeight) => {
    for (let m = 0; m < matrix.length; m++) {
        for (let n = 0; n < matrix[m].length; n++) {
            drawDirectionArrow(matrix, m, n, blockWidth, blockHeight, minReward, maxReward)
        }
    }
}

drawDirectionArrow = (matrix, m, n, blockWidth, blockHeight, minReward, maxReward) => {
    const aW = blockWidth / 2
    const aH = blockHeight / 2

    const maxIndex = indexOfMax(matrix[m][n])
    stroke(255, 255, 255)
    if (matrix[m][n][maxIndex] > maxReward*0.5) {
        const g = map(matrix[m][n][maxIndex], minReward, maxReward, 0, 255)
        fill(0, g, 0)
    } else {
        fill(255, 255, 255)
    }

    push()
    translate(blockWidth * m, blockHeight * n)

    beginShape()

    strokeWeight(0.5)
    drawVertex(maxIndex, aW, aH, blockWidth, blockHeight)

    endShape(CLOSE)
    pop()
}


drawVertex = (i, aW, aH, blockWidth, blockHeight) => {
    [() => {
        vertex(aW, aH)
        vertex(blockWidth, blockHeight)
        vertex(0, blockHeight)
    },
    () => {
        vertex(0, 0)
        vertex(aW, aH)
        vertex(blockWidth, 0)
    },
    () => {
        vertex(blockWidth, 0)
        vertex(aW, aH)
        vertex(blockWidth, blockHeight)
    },
    () => {
        vertex(0, 0)
        vertex(aW, aH)
        vertex(0, blockHeight)
    }][i]()
}

getMinRmaxR = (arr) => {
    let minR = arr[0];
    let maxR = arr[0];

    for (let i = 1; i <= arr.length; i++) {
        if (arr[i] < minR) {
            minR = arr[i]
        }
        if (arr[i] > maxR) {
            maxR = arr[i]
        }
    }
    return { minR, maxR }
}

// Maze
drawMaze = (maze, bW, bH) => {
    noStroke(0)
    for (let m = 0; m < maze.length; m++) {
        for (let n = 0; n < maze[m].length; n++) {
            if (maze[m][n]) {
                fill(120, 120, 120)
                rect(m * bW, n * bH, bW, bH)
            }
        }
    }
}

drawTarget = (t, bW, bH) => {
    fill(255, 0, 0)
    noStroke()
    ellipse(t.m * bW + bW / 2, t.n * bH + bH / 2, bW, bH)

}

drawAgent = (pos, bW, bH) => {
    noStroke()
    fill(255, 120, 0)
    rect(pos.m * bW, pos.n * bH, bW, bH)
}