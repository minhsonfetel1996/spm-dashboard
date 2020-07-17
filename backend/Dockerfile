FROM node:10

# We create a directory to hold the application code inside the image,
# this will be the working directory for your application
WORKDIR /usr/src/app/spm_dashboard

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# To bundle the source code to docker image
COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]