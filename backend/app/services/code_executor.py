import subprocess
import os
import uuid
import shutil
from typing import Dict, Tuple
from ..config import Config
from .language_handlers import LANGUAGE_HANDLERS

class ExecutionError(Exception):
    pass

class CodeExecutor:
    def __init__(self):
        self.temp_dir = Config.get_temp_dir()

    def _create_temp_file(self, code: str, language: str) -> Tuple[str, str, str]:
        if language not in LANGUAGE_HANDLERS:
            raise ExecutionError(f"Unsupported language: {language}")

        execution_id = str(uuid.uuid4())
        temp_dir = os.path.join(self.temp_dir, execution_id)
        os.makedirs(temp_dir, exist_ok=True)

        handler = LANGUAGE_HANDLERS[language]
        filename = f"main{handler.file_extension}"
        filepath = os.path.join(temp_dir, filename)
        
        prepared_code = handler.prepare_code(code)
        with open(filepath, 'w') as f:
            f.write(prepared_code)

        return temp_dir, filename, execution_id

    def _run_command(self, command: list, cwd: str) -> Tuple[str, str]:
        try:
            process = subprocess.run(
                command,
                cwd=cwd,
                capture_output=True,
                text=True,
                timeout=Config.EXECUTION_TIMEOUT
            )
            return process.stdout, process.stderr
        except subprocess.TimeoutExpired:
            raise ExecutionError("Execution timed out")
        except Exception as e:
            raise ExecutionError(str(e))

    def execute_code(self, code: str, language: str) -> Dict[str, str]:
        try:
            temp_dir, filename, execution_id = self._create_temp_file(code, language)
            handler = LANGUAGE_HANDLERS[language]
            
            try:
                # Compilation phase (if needed)
                if handler.compile_cmd:
                    executable = f"program_{execution_id}"
                    compile_cmd = [
                        arg.format(
                            filename=filename,
                            executable=executable,
                            classname=handler.main_class
                        ) for arg in handler.compile_cmd
                    ]
                    
                    _, compile_stderr = self._run_command(compile_cmd, temp_dir)
                    if compile_stderr:
                        return {"error": f"Compilation error: {compile_stderr}"}

                # Execution phase
                run_cmd = [
                    arg.format(
                        filename=filename,
                        executable=f"program_{execution_id}",
                        classname=handler.main_class
                    ) for arg in handler.run_cmd
                ]
                
                stdout, stderr = self._run_command(run_cmd, temp_dir)
                
                if stderr:
                    return {"error": stderr}
                return {"output": stdout[:Config.MAX_OUTPUT_SIZE]}

            finally:
                shutil.rmtree(temp_dir)
                
        except ExecutionError as e:
            return {"error": str(e)} 