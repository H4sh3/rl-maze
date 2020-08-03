let environment
let statistic
let fRate
let stepsTaken

let targetPositions
let targetPosIndex

setup = () => {
    const res = 22
    targetPositions = [
        { m: 8, n: 18 },
        { m: res - 2, n: 12 },
        { m: res - 2, n: res - 2 },
        { m: res - 2, n: 8 }
    ]
    targetPosIndex = Math.floor(random(targetPositions.length))
    fRate = 40
    frameRate(fRate)

    initCanvas()
    environment = new Environment(res)
    environment.init()
    environment.target = targetPositions[targetPosIndex]
    statistic = new Statistic(environment.getProperties())

    stepsTaken = { min: Infinity, count: 0 }
}

draw = () => {
    if (stepsTaken.count > 50) {
        // no quicker routes found stop exploring
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
        text('Learning...',width/2,125)
    }
    statistic.draw()
}


getTarget = () => {
    return targetPositions[targetPosIndex]
}

changeTarget = () => {
    targetPosIndex = targetPosIndex < targetPositions.length - 1 ? targetPosIndex + 1 : 0
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