import subprocess
import os
import uuid
import shutil
from typing import Dict, Tuple

class CodeExecutor:
    TEMP_DIR = "temp_code"
    
    LANGUAGE_CONFIGS = {
        "python": {
            "file_extension": ".py",
            "compile_cmd": None,
            "run_cmd": ["python", "{filename}"]
        },
        "javascript": {
            "file_extension": ".js",
            "compile_cmd": None,
            "run_cmd": ["node", "{filename}"]
        },
        "java": {
            "file_extension": ".java",
            "compile_cmd": ["javac", "{filename}"],
            "run_cmd": ["java", "{classname}"],
            "main_class": "Main"
        },
        "cpp": {
            "file_extension": ".cpp",
            "compile_cmd": ["g++", "{filename}", "-o", "{executable}"],
            "run_cmd": ["./{executable}"]
        },
        "ruby": {
            "file_extension": ".rb",
            "compile_cmd": None,
            "run_cmd": ["ruby", "{filename}"]
        },
        "go": {
            "file_extension": ".go",
            "compile_cmd": ["go", "build", "-o", "{executable}", "{filename}"],
            "run_cmd": ["./{executable}"]
        }
    }

    def __init__(self):
        os.makedirs(self.TEMP_DIR, exist_ok=True)

    def _create_temp_file(self, code: str, language: str) -> Tuple[str, str, str]:
        execution_id = str(uuid.uuid4())
        temp_dir = os.path.join(self.TEMP_DIR, execution_id)
        os.makedirs(temp_dir, exist_ok=True)

        config = self.LANGUAGE_CONFIGS[language]
        filename = f"main{config['file_extension']}"
        filepath = os.path.join(temp_dir, filename)
        
        # Special handling for Java
        if language == "java":
            code = f"public class {config['main_class']} {{\n    public static void main(String[] args) {{\n        {code}\n    }}\n}}"
        
        # Special handling for JavaScript console.log capture
        if language == "javascript":
            code = f"""
                const originalConsoleLog = console.log;
                let output = [];
                console.log = (...args) => {{
                    output.push(args.map(arg => 
                        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                    ).join(' '));
                    originalConsoleLog(...args);
                }};
                
                try {{
                    {code}
                }} catch (error) {{
                    console.error(error.message);
                }}
                
                if (output.length > 0) {{
                    console.log(output.join('\\n'));
                }}
            """

        with open(filepath, 'w') as f:
            f.write(code)

        return temp_dir, filename, execution_id

    # ... rest of the class remains the same ... 