package poo3.chinpokomon;

import java.util.List;

import poo3.attack.Attack;
import poo3.attack.CanonConico;
import poo3.attack.RayoVeloz;
import poo3.chinpokomon.nature.RobotNature;

public class Carnotron extends Chinpokomon{

	public Carnotron(String name) {
		super(name, 20, new RobotNature());
		this.learnAttack(new RayoVeloz());
		this.learnAttack(new CanonConico());
	}
	
	public Carnotron(String name, List<Attack> attacks) {
		super(name, 20, new RobotNature(), attacks);
	}
	
}
