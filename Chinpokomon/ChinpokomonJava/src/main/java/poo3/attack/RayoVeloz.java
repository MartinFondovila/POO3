package poo3.attack;

import java.util.stream.IntStream;

import poo3.chinpokomon.Chinpokomon;

public class RayoVeloz extends Attack{

   public RayoVeloz() {
       super(3, "Rayo veloz", 0, 2, 0, 1);
   }

   @Override
   protected Integer calculateCritDamage(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
	   return this.baseDamage * 2;
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
