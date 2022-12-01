from attacks.attack import Attack


class RayoVeloz(Attack):

    def __init__(chinpo):
        super().__init__("Rayo Veloz", 3, 10, 2, 2, 1, chinpo)

    def crit_hit(self, target):
        return self.base_damage * 2

    def hit(self, target):
        target.recieve_damage(self.calculate_damage(target))
