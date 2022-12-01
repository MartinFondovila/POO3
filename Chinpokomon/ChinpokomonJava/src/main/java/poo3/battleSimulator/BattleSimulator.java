package poo3.battleSimulator;

import java.util.Random;

import poo3.chinpokomon.Chinpokomon;
import poo3.logger.Logger;

public class BattleSimulator {
	private Chinpokomon chinpo1;
	private Chinpokomon chinpo2;
	private Logger log;
	private Random random;
	
	public BattleSimulator(Chinpokomon chinpo1, Chinpokomon chinpo2) {
		this.chinpo1 = chinpo1;
		this.chinpo2 = chinpo2;
		this.log = Logger.getInstance();
		this.random = new Random();
	}
	
	public BattleSimulator() {
		this.random = new Random();
		this.log = Logger.getInstance();
	}
	
	public void setChimpos(Chinpokomon chinpo1, Chinpokomon chinpo2) {
		this.chinpo1 = chinpo1;
		this.chinpo2 = chinpo2;
	}
	
	public void simulateBattle() {
		Integer round = 1;
		Chinpokomon first;
		Chinpokomon second;
		
		if(random.nextInt(100) <= 50) {
			first = this.chinpo1;
			second = this.chinpo2;
		} else {
			first = this.chinpo2;
			second = this.chinpo1;
		}
		
		first.restoreHealth();
		second.restoreHealth();
		log.info("Comienza la batalla entre " + first.getName() + " y " + second.getName());
		while(!first.KO() && !second.KO()) {
			log.info("Ronda " + round + ":");
			first.attack(second);
			if(!second.KO()) {
				second.attack(first);
			}
			round += 1;
		}
		log.info("Fin de la batalla!");
		if(!first.KO()) {
			log.info(first.getName() + " gano la batalla.");
		} else { 
			log.info(second.getName() + " gano la batalla.");
		}
	}
}
