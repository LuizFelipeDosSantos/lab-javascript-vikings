// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return this.strength;
  }

  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }

  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    }
  }

  battleCry() {
    return 'Odin Owns You All!'
  }
}

// Saxon
class Saxon extends Soldier {
  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`;
    } else {
      return `A Saxon has died in combat`;
    }
  }
}

function randomIndex(arrayLength) {
  return Math.floor(Math.random()*arrayLength);
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  addViking(viking) {
    this.vikingArmy.push(viking);
  }

  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  getRandomSoldier(soldierClass){
    if (soldierClass === "Saxon") {
      return this.saxonArmy[randomIndex(this.saxonArmy.length)]; 
    } else {
      return this.vikingArmy[randomIndex(this.vikingArmy.length)];
    }
  }

  vikingAttack() {
    return this.genericAttack(this.getRandomSoldier("Viking"), this.getRandomSoldier("Saxon"));
  }

  saxonAttack() {
    return this.genericAttack(this.getRandomSoldier("Saxon"), this.getRandomSoldier("Viking"));
  }

  genericAttack(attacker, victim) {
    let attakerArmy;
    let victimArmy; 
    //who is the attacker and the victim
    if (attacker instanceof Saxon) {
      attakerArmy = this.saxonArmy;
      victimArmy = this.vikingArmy;
    } else {
      attakerArmy = this.vikingArmy;
      victimArmy = this.saxonArmy;
    }

    const resultOfTheAttack = victim.receiveDamage(attacker.attack());

    //index of the dead victim
    let indexDeadVictim;
    victimArmy.forEach((victimSoldier, index) => {
      if (victimSoldier.health <= 0) {
        indexDeadVictim = index;
      }
    });

    //if has a dead victim, delete from the array
    if (indexDeadVictim >= 0) {
      victimArmy.splice(indexDeadVictim-1,1);
    }
    return resultOfTheAttack;
  }

  showStatus() {
    if (this.saxonArmy.length === 0) {
      return `Vikings have won the war of the century!`;
    } else if (this.vikingArmy.length === 0) {
      return `Saxons have fought for their lives and survived another day...`;
    }
    return `Vikings and Saxons are still in the thick of battle.`;
  }
}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
