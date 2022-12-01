package poo3.chinpokomon.nature;

public abstract class NatureType {
	private String natureName;
	
	public NatureType(String name) {
		this.natureName = name;
	}
	
	public String getNatureName() {
		return this.natureName;
	}
	
	public abstract Boolean hasAdvantageAgainst(NatureType nature);
	
	public abstract Boolean hasDisadvantageAgainst(NatureType nature);
}