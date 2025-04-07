<template>
    <div class="frame">
    <h2 id="gameTitle">Unscramble</h2>
        <div class="game-container">
        <h3 class="levelHeader">Level <span>{{ currentLevel }}</span></h3>
            <div class="word-display">
                <ol class="word-list">
                    <li v-for="(word, index) in currentWords" :key="index" class="word-item">
                        <div class="word">
                            <span>{{ scrambledWords[index] }}</span>
                        </div>
                        <div class="input-display">
                            <input v-model="guesses[index]" placeholder="Your guess" />
                        </div>
                    </li>
                </ol>
            </div>
            <div class="button-container">
                <button @click="checkAnswers">Check Answers</button>
            </div>
        </div>
        <p class="message">{{ message }}</p>

        <div v-if="showRetry">
            <button @click="retry">Retry</button>
        </div>

    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

//Define words for each level
const wordsLevel1 = ['code', 'eat', 'sleep', 'repeat']
const wordsLevel2 = ['GitHub', 'function', 'element', 'attribute' ]
const wordsLevel3 = ['JavaScript', 'variable', 'database', 'parameter' ]

//Track level and current game data
const currentLevel = ref(1)
const guesses = ref(['', '', '', ''])
const currentWords = ref(wordsLevel1)
const scrambledWords = ref([])
const message = ref('')
const showRetry = ref(false)

//Function for shuffling words and not matching to the words
function scrambleWord(word) {
       let scrambled = word.split('').sort(()=> Math.random() - 0.5).join('')

       while (scrambled === word) {
            scrambled = word.split('').sort(()=> Math.random() - 0.5).join('')
       }

       return scrambled
}

function scrambleAllWords() {
    scrambledWords.value = currentWords.value.map(word => scrambleWord(word))
}

watchEffect(() => {
    scrambleAllWords()
})

function checkAnswers() {
    const correctGuesses = guesses.value.map((guess, index) => {
        return guess.toLowerCase() === currentWords.value[index].toLowerCase()
    })

    if (correctGuesses.every(isCorrect => isCorrect)) {
        message.value = `Congrats, Level ${ currentLevel.value } passed`
        setTimeout(nextLevel, 1000)
    } else {
        message.value = `Level ${ currentLevel.value } failed, try again.`
    }
}

function nextLevel() {
    message.value = ''

    if(currentLevel.value === 1){
        currentLevel.value = 2
        currentWords.value = wordsLevel2
    } else if (currentLevel.value === 2) {
        currentLevel.value = 3
        currentWords.value = wordsLevel3
    } else {
        message.value = 'Congrats! You completed all levels!'
    }

    guesses.value = ['', '', '', '']
    showRetry.value = false
}

function retry() {
    currentLevel.value = 1
    currentWords.value = wordsLevel1
    guesses.value = ['', '', '', '']
    message.value = ''
    showRetry.value = false
}

</script>

<style scoped>
    .frame {
        border: 2px solid black;
        width: 70%;
        height: 350px;
        margin: 50px auto 0;
    }

    .game-container {
        text-align: center;
        margin-bottom: 15px;
    }

    .word-list {
        list-style-type: none;
        padding: 0;
    }

    .word-display {
        margin-bottom: 10px;
    }

    .word-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 5px;
    }

    .word {
        font-size: 1.5rem;
        display: flex;
        flex-direction: column;
        align-content: start;
        justify-items: center;
    }

    .input-display {

    }

    .input-display input {
        width: 60%;
        padding: 10px;
        font-size: 1rem;
        border: 1px solid black;
        border-radius: 5px;
    }

    .message {
        text-align: center;
        font-size: 1rem;
    }

    #gameTitle {
        width: 100%;
        margin-left: 15px;
        margin-top: 15px;
        position: relative;
    }

    button {
        padding: 10px;
        background-color: black;
        border-radius: 10px;
        color: white;

    }

    .levelHeader {
        font-size: 22px;
    }

</style>
