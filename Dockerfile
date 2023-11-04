FROM node:20
WORKDIR /attendance-status-app
COPY . .
#COPY package.json yarn.lock .
RUN yarn
#RUN ls > text

#CMD pwd | ls
#CMD yarn install
CMD yarn firebase login
CMD yarn firebase init
CMD yarn dev
CMD echo "Attendance app is now running"