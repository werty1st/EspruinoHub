FROM ubuntu:18.04

# Add non root user
ARG USER=pi
ARG UID=1000
ARG GID=1000

RUN useradd -m ${USER} --uid=${UID}

# install dependencies
RUN apt update
RUN apt install -y build-essential curl git wget

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -

RUN apt install -y nodejs
RUN apt install -y mosquitto-clients \
                    bluetooth bluez libbluetooth-dev \
                    libudev-dev
RUN apt install -y libcap2-bin

RUN setcap cap_net_raw+eip $(eval readlink -f `which node`)

# install Hub
WORKDIR /home/pi/EspruinoHub
ADD . .
RUN chown -R ${UID}:${GID} .
USER ${UID}:${GID}
RUN npm install

ENTRYPOINT [ "/home/pi/EspruinoHub/start.sh" ]



