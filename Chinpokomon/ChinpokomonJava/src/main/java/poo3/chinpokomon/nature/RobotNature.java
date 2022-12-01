package poo3.chinpokomon.nature;

public class RobotNature extends NatureType{

	public RobotNature() {
		super("ROBOT_NATURE");
	}

	@Override
	public Boolean hasAdvantageAgainst(NatureType nature) {
		return nature.getNatureName().equals("ANIMAL_NATURE");
	}

	@Override
	public Boolean hasDisadvantageAgainst(NatureType nature) {
		return nature.getNatureName().equals("COSA_NATURE");
	}

}
