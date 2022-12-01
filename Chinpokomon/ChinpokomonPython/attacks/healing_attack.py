from abc import ABC, abstractmethod
from attacks.attack import Attack


class HealingAttack(Attack, ABC):

    @abstractmethod
    def __init__(self, name, base_damage, speed, crit_prob, speed_attacks_number, boost_damage, base_healing, boost_healing, chinpo):
        super().__init__(name, base_damage, speed, crit_prob,
                         speed_attacks_number, boost_damage, chinpo)
        self._base_healing = base_healing
        self._boost_healing = boost_healing

    @property
    def base_healing(self):
        return self._base_healing

    @property
    def boost_healing(self):
        return self._boost_healing

    def calculate_healing(self, target):
        if (self.is_crit(self.crit_prob)):
            return self.crit_heal(target)

        if (self.chinpo.has_advantage_against(target)):
            return self.base_healing + self.boost_healing

        return self.base_healing

    @abstractmethod
    def crit_heal(self, target):
        pass
