import socket
import sys

def tcp_send_and_receive(server_ip, server_port, command, buffer_size=1024, timeout=5):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(timeout)
            print(f"Connecting to {server_ip}:{server_port}...")
            sock.connect((server_ip, server_port))

            print(f"Sending command: {command}")
            sock.sendall(command.encode())

            print("Waiting for response...")
            response = sock.recv(buffer_size)
            print(f"Received: {response.decode()}")

    except socket.timeout:
        print("Connection timed out.")
    except ConnectionRefusedError:
        print("Connection refused by the server.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    SERVER_IP = sys.argv[1]
    SERVER_PORT = int(sys.argv[2])
    COMMAND = sys.argv[3]
    tcp_send_and_receive(SERVER_IP, SERVER_PORT, COMMAND)
