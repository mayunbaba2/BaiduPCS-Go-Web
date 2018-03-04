FROM node:8

# RUN apt-get update
# RUN apt-get upgrade -y
# RUN apt-get install -y git

COPY . .
RUN npm i

EXPOSE 3000
CMD ["npm", "start"]

