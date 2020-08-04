class Agent {
    constructor() {
        this.pos = { m: 2, n: 2 }
        this.explore = true
    }

    update(action) {
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