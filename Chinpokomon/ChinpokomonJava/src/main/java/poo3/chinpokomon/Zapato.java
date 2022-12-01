package poo3.chinpokomon;

import java.util.List;

import poo3.attack.Attack;
import poo3.attack.Zapatazo;
import poo3.chinpokomon.nature.CosaNature;

public class Zapato extends Chinpokomon{

	public Zapato(String name) {
		super(name, 30, new CosaNature());
		this.learnAttack(new Zapatazo());
	}
	
	public Zapato(String name, List<Attack> attacks) {
		super(name, 30, new CosaNature(), attacks);
	}

}
