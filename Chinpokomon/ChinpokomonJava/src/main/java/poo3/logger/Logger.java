package poo3.logger;

public class Logger {
	private static Logger instance;
    private LoggerLevel level;
    private final String MESSAGE_TEMPLATE = "Logger {level} | {message}";

    private Logger(LoggerLevel level) {
        this.level = level;
    }

    public static Logger getInstance(LoggerLevel level) {
        if (instance == null) {
            instance = new Logger(level);
        }
        
        return instance;
    }
    
    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger(LoggerLevel.DEBUG);
        }
        
        return instance;
    }
    
    public LoggerLevel getLevel() {
    	return this.level;
    }
    
    public void setLevel(LoggerLevel level) {
    	this.level = level;
    }
    
    private void printMessage(String level, String message) {
    	System.out.println(
    			MESSAGE_TEMPLATE
    				.replace("{level}", level)
    				.replace("{message}", message)	
    	);
    }
    
    private Boolean canPrintMessage(LoggerLevel level) {
    	return this.level.equals(LoggerLevel.DEBUG) || level.ordinal() >= this.level.ordinal();
    }
    
    public void debug(String message) { 
    	if(this.canPrintMessage(LoggerLevel.DEBUG)) {
    		this.printMessage(LoggerLevel.DEBUG.name(), message);
    	}
    }
    
    public void info(String message) { 
    	if(this.canPrintMessage(LoggerLevel.INFO)) {
    		this.printMessage(LoggerLevel.INFO.name(), message);
    	}
    }

    public void warn(String message) { 
    	if(this.canPrintMessage(LoggerLevel.WARN)) {
    		this.printMessage(LoggerLevel.WARN.name(), message);
    	}
    }
    
    public void error(String message) { 
    	if(this.canPrintMessage(LoggerLevel.ERROR)) {
    		this.printMessage(LoggerLevel.ERROR.name(), message);
    	}
    }

}
