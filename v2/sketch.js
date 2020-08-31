let environment
let statistic
let fRate
let stepsTaken

let targetPositions
let keyPositions
let keyPosition
let res

setup = () => {
    res = 22
    targetPositions = { m: res - 2, n: res - 2 }

    keyPositions = [
        { m: 20, n: 5 },
        { m: 3, n: 18 },
        { m: 5, n: 16 },
        { m: 10, n: 10 }
    ]

    fRate = 40
    frameRate(fRate)

    initCanvas()

    keyPosition = random(keyPositions)
    environment = new Environment(res, keyPosition)

    environment.init()
    environment.target = targetPositions
    statistic = new Statistic(environment.getProperties())

    stepsTaken = { min: Infinity, count: 0 }
}

draw = () => {
    if (stepsTaken.count > 50) {
        // no faster routes found stop exploring
        environment.agent.explore = false
        if (environment.running()) {
            environment.run()
            environment.draw()
        } else {
            environment.init()
            stepsTaken = { min: Infinity, count: 0 }
            statistic = new Statistic(environment.getProperties())
        }
    } else {
        // learning
        while (environment.running()) {
            environment.run()
        }

        if (environment.i > 1) {
            statistic.add(environment.i)
        }

        if (statistic.minI === stepsTaken.min) {
            stepsTaken.count += 1
        } else {
            stepsTaken.min = statistic.minI
            stepsTaken.count = 0
        }

        environment.e++
        environment.reset()
        environment.draw()
        environment.target = getTarget()
        noStroke()
        fill(0)
        text('Learning...', width / 2, environment.qTable.blockHeight * 0.8)
    }
    drawStatistic(...statistic.getProps())
}

getTarget = () => {
    return targetPositions
}

changeKeyPos = () => {
    environment.keyPosition = random(keyPositions.filter(kp => kp.m !== environment.keyPosition.m || kp.n !== environment.keyPosition.n))
    environment.init()
    stepsTaken = { min: Infinity, count: 0 }
    statistic = new Statistic(environment.getProperties())
}

updateFrameRate = () => {
    frameRate(fRate)
}

initCanvas = () => {
    var canvasDiv = document.getElementById('p5canvas');
    var width = canvasDiv.offsetWidth
    canvasW = width
    canvasH = width
    canvas = createCanvas(canvasW, canvasH)
    canvas.parent('p5canvas');
}

showQvalues = () => {
    environment.showAllQValues = !environment.showAllQValues
}