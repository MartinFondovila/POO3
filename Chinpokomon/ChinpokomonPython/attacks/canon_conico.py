from attacks.attack import Attack


class CanonConico(Attack):

    def __init__(chinpo):
        super().__init__("Cañon Cónico", 4, 0, 2, 0, 1, chinpo)

    def crit_hit(self, target):
        return self.base_damage * 2

    def hit(self, target):
        target.recieve_damage(self.calculate_damage(target))
