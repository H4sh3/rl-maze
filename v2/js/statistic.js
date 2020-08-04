class Statistic {
    constructor(props) {
        this.props = props
        this.width = 6 * this.props.bW
        this.height = 2 * this.props.bH

        this.data = []
        this.maxI = 0
        this.minI = Infinity
    }


    add(i) {
        this.minI = i < this.minI ? i : this.minI
        this.maxI = i > this.maxI ? i : this.maxI
        this.data.push(i)
    }

    getProps(){
        return [this.data, this.props, this.width, this.height, this.maxI, this.minI]
    }
}