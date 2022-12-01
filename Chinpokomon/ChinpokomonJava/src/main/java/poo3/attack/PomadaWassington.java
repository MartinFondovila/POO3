package poo3.attack;

import java.util.stream.IntStream;

import poo3.chinpokomon.Chinpokomon;

public class PomadaWassington extends HealingAttack{
	
	public PomadaWassington() {
		super(0, "Pomada Wassington", 0, 0, 2, 5, 0, 1);
	}

	@Override
	protected Integer calculateCritDamage(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		return this.baseDamage * 2;
	}

	@Override
	protected Integer calculateCritHealing(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		return this.baseHealing * 2;
	}

	@Override
	protected void speedCritAttack(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		IntStream.rangeClosed(1, this.speedAttacks)
        .forEach(num -> chinpoAttacking.recieveHealing(this.calculateHealing(chinpoAttacking, chinpoAttacked)));
	}

	@Override
	protected void speedNormalAttack(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		chinpoAttacking.recieveHealing(this.calculateHealing(chinpoAttacking, chinpoAttacked));
	}

	@Override
	protected Integer calculateAdvantageDamage(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		return this.baseDamage + this.boostDamage;
	}
}
