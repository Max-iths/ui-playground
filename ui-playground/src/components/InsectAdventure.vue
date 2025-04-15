<template>
    <div class="game-container">
        <!-- Start Screen -->
        <div v-if="!gameStarted" class="start-screen">
            <h1>Insect Adventure</h1>
            <p>Use the left and right arrow keys to move your ladybug.</p>
            <p>Collect food, avoid obstacles and survive!</p>
            <button @click="startGame" class="btn">Start Game</button>
        </div>

        <!-- Game Screen -->
        <div v-else>
            <div class="background"></div>

            <!-- Player Ladybug -->
            <div class="player" :style="{ left: player.x + 'px', top: player.y + 'px' }">
                <div class="head"></div>
                <div class="spot spot1"></div>
                <div class="spot spot2"></div>
                <div class="spot spot3"></div>
            </div>

            <!-- Obstacles -->
            <div
            class="obstacle"
            :class="obstacle.type"
            v-for="(obstacle, index) in obstacles"
            :key="index"
            :style="{ left: obstacle.x + 'px', top: obstacle.y + 'px' }">
            </div>

            <!-- Score Display -->
            <div class="hud">
                <p>Score: {{ score }}</p>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';


export default{
    setup (){
        //Game state variables
        const gameStarted = ref(false)
        let gameLoopId

        //Player state (position)
        const player = reactive({
            x: 100,
            y: 300,
        })

        // Obstacle state (position)
        const obstacles = reactive([
            { x: 400, y: 250, type: 'flower'},
            { x: 600, y: 300, type: 'leaf'},
            { x: 200, y: 350, type: 'flower'},
            { x: 300, y: 200, type: 'leaf'},
            { x: 500, y: 150, type: 'flower'},
            { x: 700, y: 100, type: 'leaf'},
        ])

        //Score state
        const score = ref(0)

        //Game loop : update logic
        const gameLoop = () => {
            updateObstacles()
            gameLoopId = requestAnimationFrame(gameLoop)
        }

        //Move player function
        const movePlayer = (direction) => {
            if(direction === 'left' && player.x > 0) player.x -= 10
            else if(direction === 'right' && player.x < 665) player.x += 10
        }

        //Handle keydown event for movement
        const handleKeydown = (event) => {
            if(event.key === 'ArrowLeft') movePlayer('left')
            else if(event.key === 'ArrowRight') movePlayer('right')
        }

        //Update obstacle positions
        const updateObstacles = () => {
            obstacles.forEach((obstacle) => {
                obstacle.y += 1
                if (obstacle.y > 400) {
                    obstacle.y = 0;
                    obstacle.x = Math.random() * 700;
                    obstacle.type = Math.random() > 0.5 ? 'flower' : 'leaf';
                    score.value += 10;
                }

                if(checkCollision(player, obstacle)) {
                    stopGame()
                }
            })
        }

        //Check collision with obstacles
        const checkCollision = (player, obstacle) => {
            const playerRect = {
                left: player.x,
                right: player.x + 35,
                top: player.y,
                bottom: player.y + 35,
            }

            const obstacleRect = {
                left: obstacle.x,
                right: obstacle.x + 30,
                top: obstacle.y,
                bottom: obstacle.y + 30,
            }

            return !(
                playerRect.right < obstacleRect.left ||
                playerRect.left > obstacleRect.right ||
                playerRect.bottom < obstacleRect.top ||
                playerRect.top > obstacleRect.bottom
            )
        }

        //Start game function
        const startGame = () => {
            score.value = 0
             obstacles.forEach((obstacle) => {
                obstacle.x = Math.random() * 700; // Randomize x position
                obstacle.y = Math.random() * -400; // Randomize y position off-screen
            });
            gameStarted.value = true
            window.addEventListener('keydown', handleKeydown)
            gameLoopId = requestAnimationFrame(gameLoop)
        }

        //Stop game function
        const stopGame = () => {
            gameStarted.value = false
            window.removeEventListener('keydown', handleKeydown)
            cancelAnimationFrame(gameLoopId)
        }

        //Start game on onMounted
        onMounted(() => {
            window.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !gameStarted.value) {
                    startGame()
                }
            })
        })

        return {
            gameStarted,
            player,
            obstacles,
            score,
            startGame,
        }
    }
}
</script>

<style scoped>

.game-container {
    position: relative;
    width: 70%;
    height: 350px;
    background-color: lightblue;
    overflow: hidden;
    margin: 50px auto 0;
}

.start-screen {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 24px;
}

    .start-screen h1 {
        font-size: 40px;
        margin-bottom: 20px;
    }

    .start-screen p {
        margin-bottom: 10px;
    }

    .start-screen .btn {
        padding: 10px 20px;
        font-size: 18px;
        background-color:rgb(67, 170, 57);
        transition: background-color 0.3s;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .start-screen .btn:hover {
        background-color:rgb(64, 143, 46);
    }

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #87ceeb;
    }

    .player {
        position: absolute;
        width: 35px;
        height: 35px;
        background-color: red;
        border-radius: 50%;
        box-shadow: 0 0 5px black;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .head {
        position: absolute;
        width: 35px;
        height: 7px;
        background-color: black;
        border-radius: 35px 35px 0 0;
        top: -1px;
        left: 0;
    }

    .spot {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: black;
        border-radius: 50%;
    }

    .spot1 {
        top: 8px;
        left: 10px;
    }

    .spot2 {
        top: 20px;
        left: 5px;
    }

    .spot3 {
        top: 20px;
        left: 20px;
    }

    .obstacle {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: green;
        border-radius: 50%;
        box-shadow: 0 0 5px black;
    }

   .obstacle.flower {
    position: absolute;
    background: radial-gradient(circle, pink 60%, #ff69b4 100%);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.obstacle.flower::before {
    content: '';
    width: 15px;
    height: 15px;
    background-color: yellow;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255, 255, 0, 0.5);
}

.obstacle.flower::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 20px;
    background-color: green;
    bottom: -20px;
    border-radius: 2px;
}

.obstacle.leaf {
    position: absolute;
    background: linear-gradient(135deg, #228b22 0%, #32cd32 100%);
    border-radius: 50% / 20%;
    width: 50px;
    height: 20px;
    box-shadow: 0 0 5px rgba(0, 128, 0, 0.5);
    transform: rotate(-20deg);
}

.obstacle.leaf::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 20px;
    background-color: #006400;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
}

.obstacle.leaf::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: #006400;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
}

    .hud {
        position: absolute;
        top: 10px;
        left: 10px;
        color: white;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px;
        border-radius: 5px;
    }

</style>
