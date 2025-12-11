import subprocess
import time
import signal
import os

print("Force restarting backend server...")
print("="*60)

# Method 1: Try to kill by port
print("\n1. Finding process on port 8000...")
result = subprocess.run(['netstat', '-ano'], capture_output=True, text=True)

pids_to_kill = []
for line in result.stdout.split('\n'):
    if ':8000' in line and ('LISTENING' in line or 'ESTABLISHED' in line):
        parts = line.split()
        pid = parts[-1]
        if pid not in pids_to_kill and pid != '0':
            pids_to_kill.append(pid)

for pid in pids_to_kill:
    print(f"  Attempting to kill PID {pid}...")
    try:
        subprocess.run(['taskkill', '/F', '/PID', pid], capture_output=True, check=False)
        print(f"  Sent kill signal to PID {pid}")
    except Exception as e:
        print(f"  Could not kill {pid}: {e}")

# Method 2: Kill all python.exe processes except this one
print("\n2. Finding python.exe processes...")
result = subprocess.run(['tasklist'], capture_output=True, text=True)
current_pid = os.getpid()

for line in result.stdout.split('\n'):
    if 'python.exe' in line.lower():
        parts = line.split()
        if len(parts) >= 2:
            try:
                pid = int(parts[1])
                if pid != current_pid:
                    print(f"  Attempting to kill python.exe PID {pid}...")
                    subprocess.run(['taskkill', '/F', '/PID', str(pid)], capture_output=True, check=False)
            except (ValueError, IndexError):
                pass

print("\n3. Waiting for processes to terminate...")
time.sleep(3)

print("\n4. Server processes killed. You can now start the server manually with:")
print("   cd backend")
print("   python main.py")
print("\nOr run: uvicorn backend.main:app --reload")
