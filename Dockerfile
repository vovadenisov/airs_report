FROM python:3.6.1
ENV PYTHONUNBUFFERED 1

EXPOSE 8000

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g npm

RUN mkdir /test_air
RUN mkdir /test_air/src
WORKDIR /test_air/src
ADD requirements.txt /test_air/src/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ADD . /test_air/src/

RUN npm run setup
RUN npm run build
RUN cd /test_air/src/
RUN ls
RUN mkdir /test_air/conf && cp /test_air/src/deploy/default.conf /test_air/conf/test_air.conf
