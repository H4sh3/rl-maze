# Description
In this project we use reinforcement learning to teach an agent to solve a maze.
To reach the target the agent has to open a door and therefore collect a key.

# Demo
A demo can be found [here](https://js.project-zeta.org/RL-Maze-2)

# Informations
This project consists of 3 major components:
- Agent
    - Has a position
    - Can move 1 step in each direction.
- Environment
    - Has free fields, walls and a target.
    - A key that gets collected when the agents steps on it.
    - A door that opens if the agent is close and has collected the key.
    - Agent gets positiv reward for collecting the key and reaching the target.
    - Agent gets negativ reward for collision with walls or the closed door.
    - Agent also gets a small negativ reward for each step, this ensures to find the fastest way to solve the maze.
- Q-Table
    - Stores each action for each possible position ( 22 x 22 x 4 x 2) <-> (width x height x actions x keyStatus)
        - keyStatus = collected, notCollected
        - actions = up, down, left, right
    - Gets adjusted based on reward.
