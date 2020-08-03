drawMatrix = (matrix, minReward, maxReward, blockWidth, blockHeight, showAll) => {
    for (let m = 0; m < matrix.length; m++) {
        for (let n = 0; n < matrix[m].length; n++) {
            drawDirectionArrow(matrix, m, n, blockWidth, blockHeight, minReward, maxReward, showAll)
        }
    }
}

drawDirectionArrow = (matrix, m, n, blockWidth, blockHeight, minReward, maxReward, showAll) => {
    const aW = blockWidth / 2
    const aH = blockHeight / 2

    const maxIndex = indexOfMax(matrix[m][n])
    stroke(255, 255, 255)
    if (matrix[m][n][maxIndex] > maxReward * 0.01 || showAll) {
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

drawStatistic = (data, props, width, height, maxI, minI) => {
    push()
    translate(props.bW * 8, props.bH * 1.7)
    fill(255)
    rect(0, 0, width*1.5, height)
    for (let i = 1; i < data.length - 1; i++) {
        const x1 = map(i - 1, 0, data.length, 0, width)
        const y1 = map(data[i - 1], 0, maxI, 0, height)

        const x2 = map(i, 0, data.length, 0, width)
        const y2 = map(data[i], 0, maxI, 0, height)

        stroke(1)
        line(x1, height - y1, x2, height - y2)
    }

    noStroke()
    fill(0)
    text(`Max Steps: ${maxI}`, props.bW * 4.5, props.bH * 0.1)
    text(`Min Steps: ${minI}`, props.bW * 4.5, props.bH)
    pop()
}