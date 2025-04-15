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
                <button
                @click="checkAnswers"
                class="btn"
                v-if="!showRetry && !loading"
                >
                Check Answers
                </button>
                <p class="message">{{ message }}</p>
                <button @click="retry" class="btn" v-if="showRetry">
                    Retry
                </button>
            </div>
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
const loading = ref(false)

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
        loading.value = true
        setTimeout(nextLevel, 1000)
    } else {
        message.value = `Level ${ currentLevel.value } failed, try again.`
        showRetry.value = true
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
        showRetry.value = true
        return
    }

    guesses.value = ['', '', '', '']
    showRetry.value = false

    loading.value = false

}

function retry() {
    currentLevel.value = 1
    currentWords.value = wordsLevel1
    guesses.value = ['', '', '', '']
    message.value = ''
    showRetry.value = false
    loading.value = false
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
        margin-top: 0;
    }

    .word-list {
        list-style-type: none;
        padding: 0;
    }

    .word-display {
        margin-bottom: 5px;
    }

    .word-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 5px;
    }

    .word {
        font-size: 18px;
        display: flex;
        flex-direction: column;
        align-content: start;
        justify-items: center;
    }

    .input-display {

    }

    .input-display input {
        width: 60%;
        padding: 5px;
        font-size: 18px;
        border: 1px solid black;
        border-radius: 5px;
    }

    .message {
        text-align: center;
        font-size: 18px;
    }

    #gameTitle {
        margin-left: 7px;
        margin-top: 7px;
        position: relative;
    }

  .button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
    }

    .btn {
        padding: 10px;
        background-color: black;
        border-radius: 10px;
        color: white;
        border: none;
        transition:
            background-color 0.3s ease,
            transform 0.1s ease,
            box-shadow 0.1s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    .btn:hover:enabled {
        background-color: #333;
        transform: translateY(2px);
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    }

    .btn:disabled {
        background-color: #666;
        color: #ccc;
        cursor: not-allowed;
        opacity: 0.6;
    }

    .levelHeader {
        font-size: 20px;
    }

</style>
