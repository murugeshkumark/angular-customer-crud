

version=$(google-chrome-stable --version)
rm *.deb -f
if [ "$version" != "Google Chrome 76.0.3809.132" ]; then
    sudo apt-get remove google-chrome-stable -y;
    sudo wget http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_76.0.3809.132-1_amd64.deb; 
    sudo dpkg -i google-chrome-stable_76.0.3809.132-1_amd64.deb;
    rm *.deb -f
fi
version=$(node --version)

if [ "$version" != "v10.16.3" ]; then
      sudo apt-get remove node -y;
      curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -;
      sudo apt-get install -y nodejs;
fi
sudo npm install