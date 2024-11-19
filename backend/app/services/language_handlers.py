from typing import Dict, Optional

class LanguageConfig:
    def __init__(
        self,
        file_extension: str,
        compile_cmd: Optional[list] = None,
        run_cmd: list = None,
        main_class: Optional[str] = None
    ):
        self.file_extension = file_extension
        self.compile_cmd = compile_cmd
        self.run_cmd = run_cmd
        self.main_class = main_class

    def prepare_code(self, code: str) -> str:
        """Prepare code for specific language requirements"""
        return code

class JavaHandler(LanguageConfig):
    def prepare_code(self, code: str) -> str:
        return f"""
public class {self.main_class} {{
    public static void main(String[] args) {{
        {code}
    }}
}}"""

class JavaScriptHandler(LanguageConfig):
    def prepare_code(self, code: str) -> str:
        return f"""
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
}}"""

LANGUAGE_HANDLERS = {
    "python": LanguageConfig(
        file_extension=".py",
        run_cmd=["python", "{filename}"]
    ),
    "javascript": JavaScriptHandler(
        file_extension=".js",
        run_cmd=["node", "{filename}"]
    ),
    "java": JavaHandler(
        file_extension=".java",
        compile_cmd=["javac", "{filename}"],
        run_cmd=["java", "{classname}"],
        main_class="Main"
    ),
    "cpp": LanguageConfig(
        file_extension=".cpp",
        compile_cmd=["g++", "{filename}", "-o", "{executable}"],
        run_cmd=["./{executable}"]
    ),
    "ruby": LanguageConfig(
        file_extension=".rb",
        run_cmd=["ruby", "{filename}"]
    ),
    "go": LanguageConfig(
        file_extension=".go",
        compile_cmd=["go", "build", "-o", "{executable}", "{filename}"],
        run_cmd=["./{executable}"]
    )
} 