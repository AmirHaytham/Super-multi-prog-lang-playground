from flask import Flask, request, jsonify
from flask_cors import CORS
from code_executor import CodeExecutor

app = Flask(__name__)
CORS(app)

code_executor = CodeExecutor()

@app.route('/api/execute', methods=['POST'])
def execute_code():
    try:
        data = request.get_json()
        code = data.get('code')
        language = data.get('language')
        
        if not code or not language:
            return jsonify({'error': 'Code and language are required'}), 400
            
        result = code_executor.execute_code(code, language)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 