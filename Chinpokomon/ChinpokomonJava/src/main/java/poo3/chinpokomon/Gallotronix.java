package poo3.chinpokomon;

import java.util.List;

import poo3.attack.Attack;
import poo3.attack.GarraMecanica;
import poo3.chinpokomon.nature.AnimalNature;

public class Gallotronix extends Chinpokomon{

	public Gallotronix(String name) {
		super(name, 25, new AnimalNature());
		this.learnAttack(new GarraMecanica());
	}

	public Gallotronix(String name, List<Attack> attacks) {
		super(name, 25, new AnimalNature(), attacks);
	}
}
