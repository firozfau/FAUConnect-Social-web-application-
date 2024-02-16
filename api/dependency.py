import subprocess

with open("requirements.txt", "r") as file:
    required_packages = [line.strip() for line in file if line.strip()]

for package in required_packages:
    try:

        subprocess.run(["pip", "show", package], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        # print(f"{package} is already installed.")
    except subprocess.CalledProcessError:

        print(f"\nPlease wait dependency installed in your enviroment ====================> {package} \n")
        subprocess.run(["pip", "install", package], check=True)
