new Vue({

    el: '#app',

    data: {

        playerHealth: 100,

        monsterHealth: 100,

        gameIsRunning: false,

        turns: []

    },

    methods: {

        startGame: function() {

            this.gameIsRunning = true;

            this.playerHealth = 100;

            this.monsterHealth = 100;

            this.turns = [];

        },

        attack: function() {

            var damage = this.calculateDamage(3, 10);

            this.monsterHealth -= damage;

            this.turns.unshift({

                isPlayer: true,

                text: 'Player hits monster for ' + damage

            });

            if (this.checkWin()) {

                return;

            }

            this.monsterAttacks();

        },

        specialAttack: function() {

            var damage = this.calculateDamage(10, 20);

            this.monsterHealth -= damage;

            this.turns.unshift({

                isPlayer: true,

                text: 'Player hits monster with special attack for ' + damage

            });

            if (this.checkWin()) {

                return;

            }

            this.monsterAttacks();

        },

        heal: function() {

            if (this.playerHealth <= 90) {

                this.playerHealth += 10;

                this.turns.unshift({

                    isPlayer: true,

                    text: 'Player heals for 10'

                });

            }

            else {

                var healing = 100 - this.playerHealth;

                this.playerHealth = 100;

                this.turns.unshift({

                    isPlayer: true,

                    text: 'Player heals for ' + healing

                });

            }

            this.monsterAttacks()
        },

        giveUp: function() {

            this.gameIsRunning = false;
        },

        calculateDamage: function(min, max) {

            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },

        monsterAttacks: function() {

            var damage = this.calculateDamage(5, 12);

            this.playerHealth -= damage;

            this.turns.unshift({

                isPlayer: false,

                text: 'Monster hits player for ' + damage
            });

            this.checkWin();

        },

        checkWin: function() {

            if (this.monsterHealth <= 0) {

                if (confirm('You won! Wanna start a new game?')) {

                    this.startGame();

                } else {

                    this.gameIsRunning = false;
                }

                return;

            } else if (this.playerHealth <= 0) {

                if (confirm('You lost! Wanna start a new game?')) {

                    this.startGame();

                } else {

                    this.gameIsRunning = false;

                }

                return;

            }

            return false;

        }

    }

});