# Node Jukebox
[![Build Status](https://travis-ci.org/robertmain/jukebox.svg?branch=master)](https://travis-ci.org/robertmain/jukebox)  
A nodeJS youtube jukebox application. Great for parties and stuff :-)

## Installation Instructions

### Windows

#### Using Chocolatey (recommended)

1. Download chocolatey [here](https://chocolatey.org/install)
1. `choco install ffmpeg bonjour`
1. Install windows build tools: `npm install --global --production windows-build-tools`

#### Manually
1. Download Bonjour [from here](https://support.apple.com/downloads/bonjour_for_windows)
1. Download ffmpeg [from here](https://www.ffmpeg.org/)
1. Install windows build tools: `npm install --global --production windows-build-tools`

### Linux

#### Debian/Ubuntu
1. Avahi - `sudo apt-get install libavahi-compat-libdsnssd-dev`
1. FFmpeg - `sudo apt-get install ffmpeg`
1. Speaker - `sudo apt-get install libasound2-dev`
1. GCC Compiler - `sudo apt-get install gcc`
