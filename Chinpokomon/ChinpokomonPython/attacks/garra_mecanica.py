from attacks.attack import Attack


class GarraMecanica(Attack):

    def __init__(chinpo):
        super().__init__("Garra Mecánica", 2, 0, 10, 0, 2, chinpo)

    def crit_hit(self, target):
        return target.health / 2

    def hit(self, target):
        target.recieve_damage(self.calculate_damage(target))
