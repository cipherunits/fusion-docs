FROM node:20 As builder

# set name of the working directory

LABEL cipherUnit.author="cipherunits"

# Set the working directory

WORKDIR /app

# install pnpm globally
RUN npm install -g pnpm@10.5.1

#copy package.json and pnpm-lock.yaml to the working directory

COPY package*.json pnpm-lock.yaml* ./

# install dependencies

RUN pnpm install

#copy the rest of the application code to the working directory

COPY . .

#build the application
RUN pnpm build


# use a smaller image for the final build to reduce the size of the image
FROM node:20 As runner


WORKDIR /app

#copy the built application from the build stage to the runner stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public


#set port for the application

EXPOSE 3000

#start the application
CMD ["node", "server.js"]
