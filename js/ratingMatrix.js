class RatingMatrix {
    constructor(width, height) {
        this.resolution = 22
        this.matrix = initMatrix(this.resolution)
        this.blockWidth = width / this.resolution
        this.blockHeight = height / this.resolution
        this.maxReward = 0
        this.minReward = 0
    }

    setRewardAtPos(pos, action, reward, targets) {
        this.maxReward = reward > this.maxReward ? reward : this.maxReward
        this.minReward = reward < this.minReward ? reward : this.minReward
        const { n, m } = this.getCordsForPos(pos)

        this.matrix[n][m][action] = reward
    }


    getMatrixAtPos(pos, targets) {
        const { n, m } = this.getCordsForPos(pos)
        return this.matrix[n][m]
    }

    getHighestRewardAtPos(pos) {
        const { n, m } = this.getCordsForPos(pos)

        return this.matrix[n][m][indexOfMax(this.matrix[n][m])]
    }

    targetAtPos(targets) {
        return targets.length > 0
    }

    getCordsForPos = (pos) => {
        const n = Math.floor(pos.x / this.blockWidth)
        const m = Math.floor(pos.y / this.blockHeight)
        return { n, m }
    }

    getBestAction(pos) {
        const { n, m } = this.getCordsForPos(pos)


        return indexOfMax(this.matrix[n][m])
    }

    getDrawParams() {
        return [this.matrix, this.maxReward, this.minReward, this.blockWidth, this.blockHeight]
    }
}

getBestActionForCords = (matrix, n, m) => {
    return indexOfMax(matrix[n][m])
}

indexOfMax = (arr) => {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

fieldWrapper = (matrix, n, m) => {
    return matrix[n] && typeof matrix[n][m] !== 'undefined' ? matrix[n][m] : 0
}

initMatrix = (res) => {
    const m = []
    for (let i = 0; i < res; i++) {
        let n = []
        for (let j = 0; j < res; j++) {
            n.push([
                0,
                0,
                0,
                0,
            ])
        }
        m.push(n)
    }
    return m
}



//module.exports = RatingMatrix