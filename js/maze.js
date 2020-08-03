
function initMaze(res) {
    const maze = []
    for (let m = 0; m < res; m++) {
        let n = []
        for (let j = 0; j < res; j++) {
            n.push(false)
        }
        maze.push(n)
    }
    return maze
}

function addBorders(maze) {
    for (let m = 0; m < maze.length; m++) {
        for (let n = 0; n < maze[m].length; n++) {
            maze[m][n] = (m === 0 || m === maze.length - 1 || n === 0 || n === maze[m].length - 1)
        }
    }

    maze = addWalls(maze)

    return maze
}

function addWalls(maze) {
    // up to down
    maze = addHorizontalWall(maze, 5, 4, [9])
    maze = addHorizontalWall(maze, 5, 11, [3,5])
    maze = addHorizontalWall(maze, 5, 15, [10,16,20])
    
    // left to right
    maze = addVerticalWall(maze, 1, 4, [10,5])
    maze = addVerticalWall(maze, 6, 9, [5,12,20])
    maze = addVerticalWall(maze, 6, 12, [13,9,16])
    maze = addVerticalWall(maze, 6, 17, [8,17,14])

    return maze
}


function addHorizontalWall(maze, x, n, gaps) {
    for (let m = x; m < maze.length; m++) {
        maze[m][n] = !gaps.includes(m)
    }
    return maze
}

function addVerticalWall(maze, y, m, gaps) {
    for (let n = y; n < maze.length; n++) {
        maze[m][n] = !gaps.includes(n)
    }
    return maze
}