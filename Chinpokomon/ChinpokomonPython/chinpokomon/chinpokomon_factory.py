from chinpokomon.chinpokomon import Chinpokomon
from nature.nature_factory import NatureFactory
from attacks.canon_conico import CanonConico
from attacks.rayo_veloz import RayoVeloz
from attacks.zapatazo import Zapatazo
from attacks.garra_mecanica import GarraMecanica


class ChinpokomonFactory:

    def __init__(self):
        self._nature_factory = NatureFactory()

    def createChinpo(self, type, name, attacks=[]):
        creator = self.get_creator(type)
        return creator(name, attacks)

    def get_creator(self, type):
        if type == 'GALLOTRONIX':
            return self._create_gallotronix
        elif type == 'CARNOTRON':
            return self._create_carnotron
        elif type == 'ZAPATO':
            return self._create_zapato
        else:
            raise ValueError(type)

    def _create_gallotronix(self, name, attacks):
        default_attacks = [GarraMecanica()]
        chinpo = Chinpokomon(
            name, 25, self._nature_factory.create_nature("ANIMAL"), default_attacks if not attacks else attacks)
        return chinpo

    def _create_carnotron(self, name, attacks):
        default_attacks = [CanonConico(), RayoVeloz()]
        chinpo = Chinpokomon(
            name, 20, self._nature_factory.create_nature("ROBOT"), default_attacks if not attacks else attacks)
        return chinpo

    def _create_zapato(self, name, attacks):
        default_attacks = [Zapatazo()]
        chinpo = Chinpokomon(
            name, 30, self._nature_factory.create_nature("COSA"), default_attacks if not attacks else attacks)
        return chinpo
