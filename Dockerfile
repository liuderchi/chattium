FROM ubuntu:16.04
LABEL maintainer="TE-CHI LIU"

RUN apt-get update && apt-get install -y curl
RUN ["/bin/bash", "-c", "set -o pipefail && curl -sSL https://deb.nodesource.com/setup_10.x | bash -"]
RUN ["/bin/bash", "-c", "set -o pipefail && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -"]
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y \
    nodejs \
    yarn \
    openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:root' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

ENV workdir /root/chattium
ENV devServerPort 3001
ENV serverPort 3000

# NOTE to edit files in host, do
# $ docker run -v "$PWD":/root/chattium [other options...]

# NOTE to edit files in container, uncomment this:
# ADD . ${workdir}

WORKDIR ${workdir}

EXPOSE ${devServerPort}
EXPOSE ${serverPort}
EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
