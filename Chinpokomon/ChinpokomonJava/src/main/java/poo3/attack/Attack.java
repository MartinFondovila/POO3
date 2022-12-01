package poo3.attack;

import java.util.Random;
import poo3.chinpokomon.Chinpokomon;
import poo3.logger.Logger;

public abstract class Attack {
	protected Integer baseDamage;
	protected String name;
	protected Integer speed;
	protected Integer critProb;
	protected Integer speedAttacks;
	protected Integer boostDamage;
	protected Random random;
	protected Logger log;
	
	public Attack(Integer baseDamage, String name, Integer speed , Integer speedAttacks, Integer critProb, Integer boostDamage) {
	       this.baseDamage = baseDamage;
	       this.name = name;
	       this.speed = speed;
	       this.speedAttacks = speedAttacks;
	       this.critProb = critProb;
	       this.boostDamage = boostDamage;
	       this.log = Logger.getInstance();
	       this.random = new Random();
	   }
	
	public void attack(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		log.info(chinpoAttacking.getName() + " utilizo el ataque " + this.name);
		if(this.isCrit(this.speed)) {
			log.info("El ataque es muy rapido y se realizara " + this.speedAttacks + " veces");
			this.speedCritAttack(chinpoAttacking, chinpoAttacked);
		} else {
			this.speedNormalAttack(chinpoAttacking, chinpoAttacked);
		}
		log.info("Vida de " + chinpoAttacking.getName() + ": " + chinpoAttacking.getHealth());
		log.info("Vida de " + chinpoAttacked.getName() + ": " + chinpoAttacked.getHealth());
	};
	
	protected abstract void speedCritAttack(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked);
	
	protected abstract void speedNormalAttack(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked);
	
	protected abstract Integer calculateCritDamage(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked);
	
	protected abstract Integer calculateAdvantageDamage(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked);
	
	protected Integer calculateDamage(Chinpokomon chinpoAttacking, Chinpokomon chinpoAttacked) {
		if(this.isCrit(this.critProb)) {
			log.info("El ataque fue critico!");
			return this.calculateCritDamage(chinpoAttacking, chinpoAttacked);
		}
		
		if(chinpoAttacking.hasAdvantageAgainst(chinpoAttacked)) {
			return this.calculateAdvantageDamage(chinpoAttacking, chinpoAttacked);
		}
		
		return this.baseDamage;
	};
	
	protected Boolean isCrit(Integer critProb) {
		Integer randomInt = random.nextInt(100);
		
		return critProb >= 100 || (critProb > 0 && randomInt <= critProb);
	};
	
	public String getName() {
		return this.name;
	}
}
