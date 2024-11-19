import os

class Config:
    TEMP_DIR = "temp_code"
    EXECUTION_TIMEOUT = 10
    MAX_OUTPUT_SIZE = 1024 * 1024  # 1MB

    @staticmethod
    def get_temp_dir():
        temp_dir = os.path.join(os.getcwd(), Config.TEMP_DIR)
        os.makedirs(temp_dir, exist_ok=True)
        return temp_dir 