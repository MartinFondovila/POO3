package poo3.chinpokomon.nature;

public class CosaNature extends NatureType{

	public CosaNature() {
		super("COSA_NATURE");
	}

	@Override
	public Boolean hasAdvantageAgainst(NatureType nature) {
		return nature.getNatureName().equals("ROBOT_NATURE");
	}

	@Override
	public Boolean hasDisadvantageAgainst(NatureType nature) {
		return nature.getNatureName().equals("ANIMAL_NATURE");
	}

}
