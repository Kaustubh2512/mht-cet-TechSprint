import re

pattern = re.compile(r"^[A-Z]{3,}[A-Z0-9]*$")

data =['', 'GSCS', 'GSEBCS', 'LOPENS', 'LSEBCS', 'TFWS', 'PWDROBC\nS', 'EWS']



if all(pattern.fullmatch(item) or item == "" for item in data):
    print('match')
else:
    print('no')