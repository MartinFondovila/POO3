package poo3.chinpokomon.nature;

public class AnimalNature extends NatureType{

	public AnimalNature() {
		super("ANIMAL_NATURE");
	}

	@Override
	public Boolean hasAdvantageAgainst(NatureType nature) {
		return nature.getNatureName().equals("COSA_NATURE");
	}

	@Override
	public Boolean hasDisadvantageAgainst(NatureType nature) {
		return nature.getNatureName().equals("ROBOT_NATURE");
	}

}
