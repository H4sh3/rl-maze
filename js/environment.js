class Environment {
    constructor(res) {
        this.res = res
        this.qTable = new QTable(this.res)
        this.spawnPos = { m: 2, n: 2 }
        this.target;
        this.agent;
        this.i;
        this.e;
        this.targetFound = false

        this.maze = initMaze(this.res)
        this.maze = addBorders(this.maze)
    }

    run() {
        const oldPos = { m: this.agent.pos.m, n: this.agent.pos.n }
        const action = this.agent.update(this.qTable, this.target)

        let collision = this.checkCollision(this.maze, this.agent)
        if (collision) {
            this.agent.pos = oldPos
        }

        // found target ? 
        this.targetFound = this.target.m === this.agent.pos.m && this.target.n === this.agent.pos.n

        let reward = this.targetFound ? 10 : -0.1
        reward = collision ? -1 : reward

        const oldValue = this.qTable.getMatrixAtPos(oldPos.m, oldPos.n)[action]
        const next_max = this.qTable.getHighestRewardAtPos(this.agent.pos.m, this.agent.pos.n, this.target)

        const gamma = 0.85
        const lr = 0.99
        const newValue = (1 - gamma) * oldValue + lr * (reward + gamma * next_max)

        this.qTable.setRewardAtPos(oldPos.m, oldPos.n, action, newValue)

        // inc iteration
        this.i++
    }

    draw() {
        background(255)
        drawMatrix(...this.qTable.getDrawParams())
        drawMaze(this.maze, this.qTable.blockWidth, this.qTable.blockHeight)
        drawAgent(this.agent.pos, this.qTable.blockWidth, this.qTable.blockHeight)
        drawTarget(this.target, this.qTable.blockWidth, this.qTable.blockHeight)
    }

    init() {
        this.reset()
        this.e = 0
        this.qTable = new QTable(this.res)
    }

    reset() {
        this.spawnAgent()
        this.targetFound = false
        this.i = 0
    }

    spawnAgent() {
        this.agent = new Agent()
    }

    running() {
        return !this.done();
    }

    done() {
        return this.targetFound
    }

    getProperties() {
        return { bW: this.qTable.blockWidth, bH: this.qTable.blockHeight }
    }

    checkCollision(maze, agent) {
        const outOfMap = agent.pos.m < 0 ||
            agent.pos.m >= this.qTable.res ||
            agent.pos.n < 0 ||
            agent.pos.n >= this.qTable.res

        return outOfMap || maze[agent.pos.m][agent.pos.n]
    }
}
