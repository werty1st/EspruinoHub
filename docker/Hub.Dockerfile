### START BUILD ###
FROM ubuntu:18.04 as builder

# install dependencies
RUN apt update
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs build-essential git wget make gcc g++ libbluetooth-dev libudev-dev

WORKDIR /home/pi/EspruinoHub
ADD . .
RUN npm install
### ENDE BUILD ###


### START RUNTIME ###
FROM ubuntu:18.04
# Add non root user
ARG USER=pi
ARG UID=1000
ARG GID=1000

RUN useradd -m ${USER} --uid=${UID}

# install dependencies
RUN apt update && \
    apt install -y curl && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt install -y nodejs mosquitto-clients \
        bluetooth bluez libcap2-bin && \
    rm -rf /var/lib/apt/lists/*

RUN setcap cap_net_raw+eip $(eval readlink -f `which node`)

# install Hub
COPY --from=builder /home/pi/EspruinoHub /home/pi/EspruinoHub
WORKDIR /home/pi/EspruinoHub
RUN chown -R ${UID}:${GID} .

USER ${UID}:${GID}

CMD [ "node", "index.js" ]



