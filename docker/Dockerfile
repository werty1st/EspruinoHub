FROM ubuntu:18.04

# Add non root user
ARG USER=pi
ARG UID=1000
ARG GID=1000

RUN useradd -m ${USER} --uid=${UID}

# install dependencies
RUN apt update
#RUN apt install -y python-rpi.gpio

#RUNs as docker service
#RUN apt install -y mosquitto

RUN apt install -y build-essential curl git wget

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN apt install -y nodejs
RUN apt install -y mosquitto-clients \
                    bluetooth bluez libbluetooth-dev \
                    libudev-dev
                    
#RUNs as docker service
#RUN npm install -g --unsafe-perm node-red

WORKDIR /home/pi/EspruinoHub

# install Hub
ADD . .
RUN chown -R ${UID}:${GID} .

USER ${UID}:${GID}
RUN npm install




