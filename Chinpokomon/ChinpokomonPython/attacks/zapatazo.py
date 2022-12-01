from attacks.attack import Attack


class Zapatazo(Attack):

    def __init__(chinpo):
        super().__init__("Zapatazo", 1, 50, 2, 2, 3, chinpo)

    def crit_hit(self, target):
        return self.base_damage * 2

    def hit(self, target):
        target.recieve_damage(self.calculate_damage(target))
