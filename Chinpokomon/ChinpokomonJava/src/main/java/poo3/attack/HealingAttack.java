package poo3.attack;

import poo3.chinpokomon.Chinpokomon;

public abstract class HealingAttack extends Attack {
	protected Integer baseHealing;
	protected Integer boostHealing;

	public HealingAttack(Integer baseDamage, String name, Integer speed, Integer speedAttacks, Integer critProb, Integer baseHealing, Integer boostDamage, Integer boostHealing) {
		super(baseDamage, name, speed,speedAttacks, critProb, boostDamage);
		this.baseHealing = baseHealing;
		this.baseHealing = boostHealing;
	}
	
	protected Integer calculateHealing(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		if(this.isCrit(critProb)) {
			return this.calculateCritHealing(chinpoAttacking, chinpoAttacked);
		}
		
		return this.baseHealing;
	};
	
	protected abstract Integer calculateCritHealing(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked);

}
