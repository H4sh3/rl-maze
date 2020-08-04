class QTable {
    constructor() {
        this.res = 22
        this.matrix = initMatrix(this.res)
        this.blockWidth = width / this.res
        this.blockHeight = height / this.res
        this.maxReward = -Infinity
        this.minReward = Infinity
    }

    setRewardAtPos(m, n, action, reward, hasKey) {
        this.maxReward = reward > this.maxReward ? reward : this.maxReward
        this.minReward = reward < this.minReward ? reward : this.minReward
        if (hasKey) {
            this.matrix[m][n].hasKey[action] = reward
        } else {
            this.matrix[m][n].noKey[action] = reward
        }
    }


    getMatrixAtPos(m, n, hasKey) {
        if (hasKey) {
            return this.matrix[m][n].hasKey
        } else {
            return this.matrix[m][n].noKey
        }
    }
    
    getHighestRewardAtPos(m, n, hasKey) {
        if (hasKey) {
            return this.matrix[m][n].hasKey[indexOfMax(this.matrix[m][n].hasKey)]
        } else {
            return this.matrix[m][n].noKey[indexOfMax(this.matrix[m][n].noKey)]
        }
    }

    getBestAction(m, n, hasKey) {
        if (hasKey) {
            return indexOfMax(this.matrix[m][n].hasKey)
        } else {
            return indexOfMax(this.matrix[m][n].noKey)
        }
    }

    getDrawParams() {
        return [this.matrix, this.minReward, this.maxReward, this.blockWidth, this.blockHeight]
    }
}

indexOfMax = (arr) => {
    if (arr.length === 0) {
        return -1;
    }

    var maxIndex = 0;
    var max = arr[maxIndex];

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

initMatrix = (res) => {
    const m = []
    for (let i = 0; i < res; i++) {
        let n = []
        for (let j = 0; j < res; j++) {
            n.push({
                hasKey: [
                    0,
                    0,
                    0,
                    0,
                ],
                noKey: [
                    0,
                    0,
                    0,
                    0,
                ],
            })
        }
        m.push(n)
    }
    return m
}