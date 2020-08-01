let environment
let statistic

setup = () => {
    initCanvas()
    environment = new Environment()
    environment.init()
    statistic = new Statistic(environment.getProperties())
}

draw = () => {
    if (environment.e < 25 || environment.e % 25 !== 1) {
        while (environment.running()) {
            environment.run()
        }
        statistic.add(environment.i)
        environment.e++
        environment.reset()
    } else {
        if (environment.running()) {
            environment.run()
            environment.draw()
            statistic.draw()
        } else {
            statistic.add(environment.i)
            environment.e++
            environment.reset()
        }
    }
}

initCanvas = () => {
    var canvasDiv = document.getElementById('p5canvas');
    var width = canvasDiv.offsetWidth
    canvasW = width
    canvasH = width
    canvas = createCanvas(canvasW, canvasH)
    canvas.parent('p5canvas');
}