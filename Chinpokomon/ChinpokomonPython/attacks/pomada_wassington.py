from attacks.healing_attack import HealingAttack


class PomadaWassington(HealingAttack):

    def __init__(chinpo):
        super().__init__("Pomada Wassington", 0, 0, 2, 0, 0, 5, 1, chinpo)

    def hit(self, target):
        self.chinpo.recieve_healing(self.calculate_healing(target))

    def crit_heal(self, target):
        return self.base_healing * 2

    def crit_hit(self, target):
        return self.base_damage * 2
