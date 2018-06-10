# Node Jukebox
[![Build Status](https://travis-ci.org/robertmain/jukebox.svg?branch=master)](https://travis-ci.org/robertmain/jukebox) 
[![codecov](https://codecov.io/gh/robertmain/jukebox/branch/master/graph/badge.svg)](https://codecov.io/gh/robertmain/jukebox)  
A nodeJS youtube jukebox application. Great for parties and stuff :-)

## Installation Instructions

### Windows

#### Using Chocolatey (recommended)

1. Download chocolatey [here](https://chocolatey.org/install)
1. `choco install ffmpeg`
1. Install windows build tools: `npm install --global --production windows-build-tools`
1. Install the Bonjour SDK from [here](https://developer.apple.com/download/more/?=Bonjour%20SDK%20for%20Windows)(you will need to sign in and/or create an Apple developer account to download this, but don't worry - it doesn't cost anything).

#### Manually
1. Download Bonjour [from here](https://support.apple.com/downloads/bonjour_for_windows)
1. Download ffmpeg [from here](https://www.ffmpeg.org/)
1. Install windows build tools: `npm install --global --production windows-build-tools`

### Linux

#### Debian/Ubuntu
1. Avahi - `sudo apt-get install libavahi-compat-libdsnssd-dev`
1. FFmpeg - `sudo apt-get install ffmpeg` (`sudo apt-get install libav` on older versions of Ubuntu)
1. Speaker - `sudo apt-get install libasound2-dev`
1. GCC Compiler - `sudo apt-get install gcc`

### Mac OS X

#### OS X version 10.11 and up
1. FFmpeg - If you haven't yet, install [Homebrew](https://brew.sh), then run `brew install ffmpeg`.
1. Speaker - If you haven't, install Node and npm using homebrew again --> `brew install node`. Then run `sudo npm install speaker`.
1. GCC Compiler - Install the [Xcode Command Line Tools](https://bit.ly/10L7gE7) which includes the GCC compiler.

## Testing
The tests can be run using `npm run test` and (optionally) `npm run coverage:html` to generate a code coverage report
