from flask import Blueprint, request, jsonify
from .services.code_executor import CodeExecutor

api = Blueprint('api', __name__)
code_executor = CodeExecutor()

@api.route('/execute', methods=['POST'])
def execute_code():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        code = data.get('code')
        language = data.get('language')
        
        if not code or not language:
            return jsonify({'error': 'Code and language are required'}), 400
            
        result = code_executor.execute_code(code, language)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500 