class Agent {
    constructor() {
        this.pos = { m: 2, n: 2 }
        this.explore = true
    }

    update(qTable, target) {
        let action;

        if (random() < 0.1 && this.explore) {
            // pick random action
            action = random([0, 1, 2, 3])
        } else {
            // use qTable
            action = qTable.getBestAction(this.pos.m, this.pos.n, target)
        }

        if (action === 0) {
            this.pos.n -= 1
        } else if (action === 1) {
            this.pos.n += 1
        } else if (action === 2) {
            this.pos.m -= 1
        } else if (action === 3) {
            this.pos.m += 1
        }

        return action
    }
}