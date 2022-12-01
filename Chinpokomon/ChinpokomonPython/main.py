from logger.logger import Logger
from logger.logger_level import LoggerLevel
from battle_simulator import BattleSimulator
from chinpokomon.chinpokomon_factory import ChinpokomonFactory
from attacks.pomada_wassington import PomadaWassington
from attacks.zapatazo import Zapatazo

if __name__ == '__main__':
    logger = Logger()
    logger2 = Logger(LoggerLevel.ERROR)

    print("NIVEL DEBUG")
    logger.debug("Esto es un debug")
    logger.info("Esta es una info")
    logger.warn("Warning")
    logger.error("Esto es un error")

    logger.level = LoggerLevel.INFO

    print("NIVEL INFO")
    logger.debug("Esto es un debug")
    logger.info("Esta es una info")
    logger.warn("Warning")
    logger.error("Esto es un error")

    logger.level = LoggerLevel.WARN

    print("NIVEL WARN")
    logger.debug("Esto es un debug")
    logger.info("Esta es una info")
    logger.warn("Warning")
    logger.error("Esto es un error")

    logger.level = LoggerLevel.ERROR

    print("NIVEL ERROR")
    logger.debug("Esto es un debug")
    logger.info("Esta es una info")
    logger.warn("Warning")
    logger.error("Esto es un error")

    logger.level = LoggerLevel.INFO

    chinpo_factory = ChinpokomonFactory()

    zapaton = chinpo_factory.createChinpo("ZAPATO", "Zapaton")
    zapatin = chinpo_factory.createChinpo(
        "ZAPATO", "Zapatin", [PomadaWassington(), Zapatazo()])
    carno = chinpo_factory.createChinpo("CARNOTRON", "Carnotauro")

    battle_simulator = BattleSimulator()
    battle_simulator.first_chinpo = zapaton
    battle_simulator.second_chinpo = carno

    battle_simulator.simulate_battle()

    battle_simulator.first_chinpo = zapatin
    battle_simulator.second_chinpo = zapaton

    battle_simulator.simulate_battle()
