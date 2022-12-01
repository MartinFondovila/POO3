package poo3.attack;

import java.util.stream.IntStream;

import poo3.chinpokomon.Chinpokomon;

public class GarraMecanica extends Attack{
	
	public GarraMecanica() {
	    super(2, "Garra mecánica", 0, 2, 10, 2);
	}

	@Override
	protected Integer calculateCritDamage(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked){
		return chinpoAttacked.getHealth() / 2;
	}

	@Override
	protected void speedCritAttack(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		IntStream.rangeClosed(1, this.speedAttacks)
        .forEach(num -> chinpoAttacked.recieveDamage(this.calculateDamage(chinpoAttacking, chinpoAttacked)));
	}

	@Override
	protected void speedNormalAttack(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		chinpoAttacked.recieveDamage(this.calculateDamage(chinpoAttacking, chinpoAttacked));
	}

	@Override
	protected Integer calculateAdvantageDamage(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		return this.baseDamage + this.boostDamage;
	}
}
