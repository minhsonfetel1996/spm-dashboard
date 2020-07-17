# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app/spm_dashboard
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/spm_dashboard/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app/spm_dashboard
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/spm_dashboard/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
