// Functions
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // A draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // Player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // A draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // Monster lost
                this.winner = 'player';
            }
        }
    },
    computed: {
        // Set styles for health bar based on current monster health
        monsterBarStyles() {
            // set health bar to 0% if monster loses
            if (this.monsterHealth < 0) {
                return {width: '0%'};
            }
            
            return {width: this.monsterHealth + '%'}
        },
        // Set styles for health bar based on current player health
        playerBarStyles() {
            // set health bar to 0% if player loses
            if (this.playerHealth < 0) {
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'}
        },
        // Limit use of special attack
        mayUseSpecialAttack() {
            return this.currentRound % 3 != 0;
        }
    },
    methods: {
        attackMonster() {
            // Increment round
            this.currentRound++;

            // Calculate damage dealt
            const attackValue = getRandomValue(5, 12)

            // Reduce monster helath by damage amount
            this.monsterHealth -= attackValue;

            // Add log message
            this.addLogMessage('player', 'attack', attackValue);

            // Trigger attackPlayer function in response
            this.attackPlayer();
        },
        attackPlayer() {
            // Calculate damage dealt from monster
            const attackValue = getRandomValue(8, 12)

            // Reduce player health by damage amount
            this.playerHealth -= attackValue;

            // Add log message
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            // Increment round
            this.currentRound++;

            // Calculate damage dealt
            const attackValue = getRandomValue(10, 25)

            // Reduce monster helath by damage amount
            this.monsterHealth -= attackValue;

            // Add log message
            this.addLogMessage('player', 'attack', attackValue);

            // Trigger attackPlayer function in response
            this.attackPlayer();
        },
        healPlayer() {
            // Increment round
            this.currentRound++;

            // Calculate heal amount
            const healValue = getRandomValue(8, 20);

            // Increase player health by heal amount (up to 100)
            if (this.playerHealth += healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }

            // Add log message
            this.addLogMessage('player', 'heal', healValue);

            // Trigger attackPlayer function in response
            this.attackPlayer();
        },
        startNewGame() {
            // reset all parameters to default
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');