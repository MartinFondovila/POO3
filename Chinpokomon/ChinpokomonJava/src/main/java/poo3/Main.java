package poo3;

import java.util.List;

import poo3.attack.PomadaWassington;
import poo3.attack.Zapatazo;
import poo3.battleSimulator.BattleSimulator;
import poo3.chinpokomon.Carnotron;
import poo3.chinpokomon.Chinpokomon;
import poo3.chinpokomon.Zapato;
import poo3.logger.Logger;
import poo3.logger.LoggerLevel;

public class Main {

	public static void main(String[] args) {
		Chinpokomon zapaton = new Zapato("Zapaton");
		Chinpokomon zapatin = new Zapato("Zapatin", List.of(new Zapatazo(), new PomadaWassington()));
		Chinpokomon carno = new Carnotron("Carnotauro");
		
		BattleSimulator battleSimulator = new BattleSimulator();
		battleSimulator.setChimpos(zapaton, carno);
		
		battleSimulator.simulateBattle();
		
		battleSimulator.setChimpos(zapatin, zapaton);
		
		battleSimulator.simulateBattle();
	}

}
