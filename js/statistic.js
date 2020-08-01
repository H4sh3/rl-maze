class Statistic {
    constructor(props) {
        this.props = props
        this.width = 6 * this.props.bW
        this.height = 2 * this.props.bH

        this.data = []
        this.maxI = 0
        this.minI = Infinity
    }

    draw() {
        push()
        translate(this.props.bW * 15, this.props.bH)
        fill(255)
        rect(0, 0, this.width, this.height)
        for (let i = 1; i < this.data.length-1; i++) {
            const x1 = map(i-1, 0, this.data.length, 0, this.width)
            const y1 = map(this.data[i-1], 0, this.maxI, 0, this.height)

            const x2 = map(i, 0, this.data.length, 0, this.width)
            const y2 = map(this.data[i], 0, this.maxI, 0, this.height)

            stroke(1)
            line(x1,this.height-y1,x2,this.height-y2)
        }

        noStroke()
        fill(0)
        text(`Max Steps: ${this.maxI}`,this.props.bW*2.5,this.props.bH*0.5)
        text(`Min Steps: ${this.minI}`,this.props.bW*2.5,this.props.bH)
        pop()
    }

    add(i) {
        this.minI = i < this.minI ? i : this.minI
        this.maxI = i > this.maxI ? i : this.maxI
        this.data.push(i)
    }
}