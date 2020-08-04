# Description
In this project we use reinforcement learning to teach an agent to solve a maze.

# Demo
A demo can be found [here](https://js.project-zeta.org/RL-Maze)

# Informations
This project consists of 3 major components:
- Agent
    - Has a position
    - Can move 1 step in each direction
- Environment
    - Has free fields, walls and a target
    - Agent gets negativ reward for collision with walls
    - Agent gets positiv reward for reaching the target
- Q-Table
    - Stores each action for each possible position (22x22x4) <-> (Width x Height x NumActions)
    - Gets adjusted based on reward


