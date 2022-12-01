from logger.logger import Logger
import random


class Chinpokomon():

    def __init__(self, name, health, nature, attacks=[]):
        self._logger = Logger()
        self._name = name
        self._health = health
        self._nature = nature
        self._max_health = health
        self._attacks = attacks

        for attack in attacks:
            attack.chinpo = self

    @property
    def name(self):
        return self._name

    @property
    def nature(self):
        return self._nature

    @property
    def health(self):
        return self._health

    @health.setter
    def health(self, health):
        self._health = health

    @property
    def max_health(self):
        return self._max_health

    @property
    def attacks(self):
        return self._attacks

    @property
    def logger(self):
        return self._logger

    def lear_attack(self, attack):
        attack.chinpo = self
        self._attacks.append(attack)

    def lear_attacks(self, attacks):
        for attack in attacks:
            self.lear_attack(attack)

    def attack(self, chinpo):
        random_attack = self.random_attack()
        random_attack.activate(chinpo)

    def recieve_damage(self, damage):
        if ((self.health - damage) < 0):
            self.health = 0
        else:
            self.health = self.health - damage
        self.logger.info(self.name + " recibio " +
                         str(damage) + " puntos de daño.")
        self.logger.info("Puntos de vida de " +
                         str(self.name) + " " + str(self.health))

    def recieve_healing(self, healing):
        if ((self.health + healing) > self.max_health):
            self.health = self.max_health
        else:
            self.health = self.health + healing
        self.logger.info(self.name + " recibio " +
                         str(healing) + " puntos de curación.")
        self.logger.info("Puntos de vida de " +
                         self.name + " " + str(self.health))

    def random_attack(self):
        return random.choice(self.attacks)

    def restore_health(self):
        self.health = self.max_health

    def ko(self):
        return self.health == 0

    def has_advantage_against(self, chinpo):
        return self.nature.has_advantage_against(chinpo.nature)

    def has_disadvantage_against(self, chinpo):
        return self.nature.has_disadvantage_against(chinpo.nature)
