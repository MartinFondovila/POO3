package poo3.chinpokomon;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import poo3.attack.Attack;
import poo3.chinpokomon.nature.NatureType;
import poo3.logger.Logger;

public abstract class Chinpokomon {
	protected Integer health;
	protected Integer maxHealth;
	protected List<Attack> attacks;
	protected String name;
	protected NatureType nature;
	protected Logger log;
	protected Random random;
	
	public Chinpokomon(String name, Integer health, NatureType nature){
		this.name = name;
		this.nature = nature;
		this.health = health;
		this.maxHealth = health;
		this.log = Logger.getInstance();
		this.random = new Random();
		this.attacks = new ArrayList<Attack>();
	}
	
	public Chinpokomon(String name, Integer health, NatureType nature, List<Attack> attacks) {
		this(name, health, nature);
		this.attacks.addAll(attacks);
	}
	
	public void learnAttack(Attack attack) {
		this.attacks.add(attack);
	}
	
	public void attack(Chinpokomon chinpo) {
		Attack randomAttack = this.randomAttack();
		randomAttack.attack(this, chinpo);
	}
	
	public void recieveDamage(Integer damage) {
		if((this.health - damage) < 0) {
			this.health = 0;
		} else {
			this.health -= damage;
		}
		log.info(this.name + " recibio " + damage + " puntos de daño.");
	}
	
	public void recieveHealing(Integer healing) {
		if((this.health + healing) > this.maxHealth) {
			this.health = this.maxHealth;
		} else {
			this.health += healing;
		}
		log.info(this.name + " recibio " + healing + " puntos de curación.");
	}
	
	protected Attack randomAttack() {
		return this.attacks.get(random.nextInt(this.attacks.size()));
	}
	
	public void restoreHealth() {
		this.health = this.maxHealth;
	}
	
	public Boolean KO() {
		return this.health == 0;
	}
	
	public Integer getHealth() {
		return this.health;
	}
	
	public String getName() {
		return this.name;
	}
	
	public NatureType getNature() {
		return this.nature;
	}
	
	public Boolean hasAdvantageAgainst(Chinpokomon chinpo) {
		return this.nature.hasAdvantageAgainst(chinpo.getNature());
	}
	
	public Boolean hasDisadvantageAgainst(Chinpokomon chinpo) {
		return this.nature.hasDisadvantageAgainst(chinpo.getNature());
	}
}
