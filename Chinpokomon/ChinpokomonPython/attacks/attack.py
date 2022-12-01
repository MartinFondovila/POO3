from abc import ABC, abstractmethod
from logger.logger import Logger
import random


class Attack(ABC):

    @abstractmethod
    def __init__(self, name, base_damage, speed, crit_prob, speed_attacks_number, boost_damage, chinpo=None):
        self._chinpo = chinpo
        self._name = name
        self._base_damage = base_damage
        self._speed = speed
        self._crit_prob = crit_prob
        self._speed_attacks_number = speed_attacks_number
        self._boost_damage = boost_damage
        self._logger = Logger()

    @property
    def chinpo(self):
        return self._chinpo

    @chinpo.setter
    def chinpo(self, chinpo):
        self._chinpo = chinpo

    @property
    def name(self):
        return self._name

    @property
    def base_damage(self):
        return self._base_damage

    @property
    def speed(self):
        return self._speed

    @property
    def crit_prob(self):
        return self._crit_prob

    @property
    def speed_attacks_number(self):
        return self._speed_attacks_number

    @property
    def boost_damage(self):
        return self._boost_damage

    @property
    def logger(self):
        return self._logger

    def activate(self, target):
        self.logger.info(self.chinpo.name +
                         " utilizo el ataque " + self.name)
        if (self.is_crit(self.speed)):
            self.logger.info("El ataque es muy rapido y se realizara " +
                             str(self.speed_attacks_number) + " veces")
            self.hit_times(target)
        else:
            self.hit(target)

    @abstractmethod
    def hit(self, target):
        pass

    def hit_times(self, target):
        for _ in range(self.speed_attacks_number):
            self.hit(target)

    @abstractmethod
    def crit_hit(self, target):
        pass

    def is_crit(self, crit_prob):
        random_int = random.randint(1, 100)
        return crit_prob >= 100 or (crit_prob > 0 and random_int <= crit_prob)

    def calculate_damage(self, target):
        if (self.is_crit(self.crit_prob)):
            self.logger.info("El ataque fue critico!")
            return self.crit_hit(target)

        if (self.chinpo.has_advantage_against(target)):
            return self.base_damage + self.boost_damage

        return self.base_damage
