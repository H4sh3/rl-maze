let environment
let statistic

setup = () => {
    createCanvas(800, 800)
    environment = new Environment()
    environment.reset()
    statistic = new Statistic(environment.getProperties())
}

draw = () => {

    if (environment.e < 50 || environment.e % 25 !== 1) {
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