import subprocess
import time
import sys
import socket

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def find_and_kill_process_on_port(port):
    try:
        # Find process on port
        result = subprocess.run(
            ['netstat', '-ano'],
            capture_output=True,
            text=True
        )

        for line in result.stdout.split('\n'):
            if f':{port}' in line and 'LISTENING' in line:
                parts = line.split()
                pid = parts[-1]
                print(f"Found process {pid} on port {port}")

                # Kill the process using subprocess
                subprocess.run(['taskkill', '/F', '/PID', pid], capture_output=True)
                print(f"Killed process {pid}")
                time.sleep(2)
                return True
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

# Kill any process on port 8000
print("Checking port 8000...")
if is_port_in_use(8000):
    print("Port 8000 is in use. Killing process...")
    find_and_kill_process_on_port(8000)
    time.sleep(2)
else:
    print("Port 8000 is free")

# Start the server
print("\nStarting backend server...")
print("="*60)
subprocess.run([sys.executable, 'main.py'])
