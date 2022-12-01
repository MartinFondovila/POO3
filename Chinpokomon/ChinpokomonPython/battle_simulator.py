from logger.logger import Logger
import random


class BattleSimulator():

    def __init__(self, first_chinpo=None, second_chinpo=None):
        self._first_chinpo = first_chinpo
        self._second_chinpo = second_chinpo
        self._logger = Logger()

    @property
    def first_chinpo(self):
        return self._first_chinpo

    @first_chinpo.setter
    def first_chinpo(self, first_chinpo):
        self._first_chinpo = first_chinpo

    @property
    def second_chinpo(self):
        return self._second_chinpo

    @second_chinpo.setter
    def second_chinpo(self, second_chinpo):
        self._second_chinpo = second_chinpo

    @property
    def logger(self):
        return self._logger

    def simulate_battle(self):
        round = 1
        first = None
        second = None

        if (random.randint(1, 100) <= 50):
            first = self.first_chinpo
            second = self.second_chinpo
        else:
            first = self._second_chinpo
            second = self._first_chinpo

        first.restore_health()
        second.restore_health()
        self.logger.info("Comienza la batalla entre " +
                         first.name + " y " + second.name)
        while (not first.ko() and not second.ko()):
            self.logger.info("Ronda " + str(round) + ":")
            first.attack(second)
            if (not second.ko()):
                second.attack(first)
            round += 1

        self.logger.info("Fin de la batalla!")
        if (not first.ko()):
            self.logger.info(first.name + " gano la batalla.")
        else:
            self.logger.info(second.name + " gano la batalla.")
