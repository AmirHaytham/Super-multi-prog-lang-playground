#!/bin/bash
# This script will execute the code submitted by the user

# Create a file with the code to run
echo "$USER_CODE" > code.py

# Run the Python code with a timeout to prevent abuse
timeout 5s python code.py