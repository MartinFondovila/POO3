from logger.logger_level import LoggerLevel


class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class Logger(metaclass=SingletonMeta):

    def __init__(self, level=LoggerLevel.DEBUG):
        self._level = level
        self._message_template = "Logger {level} | {message}"

    @property
    def level(self):
        return self._level

    @level.setter
    def level(self, level):
        self._level = level

    def print_message(self, level, message):
        print(self._message_template.format(level=level.name, message=message))

    def can_print_message(self, level):
        return self._level is LoggerLevel.DEBUG or level.value >= self._level.value

    def debug(self, message):
        if (self.can_print_message(LoggerLevel.DEBUG)):
            self.print_message(LoggerLevel.DEBUG, message)

    def info(self, message):
        if (self.can_print_message(LoggerLevel.INFO)):
            self.print_message(LoggerLevel.INFO, message)

    def warn(self, message):
        if (self.can_print_message(LoggerLevel.WARN)):
            self.print_message(LoggerLevel.WARN, message)

    def error(self, message):
        if (self.can_print_message(LoggerLevel.ERROR)):
            self.print_message(LoggerLevel.ERROR, message)
