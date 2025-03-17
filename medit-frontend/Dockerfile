# Usa una immagine ufficiale di Node.js come base
FROM node:20-alpine

# Imposta la cartella di lavoro
WORKDIR /app

# Copia il file package.json e package-lock.json (se presente)
COPY package*.json ./

# Installa le dipendenze
RUN npm install

RUN apk add --no-cache openjdk21

# Copia tutto il codice sorgente nella cartella di lavoro
COPY . .

RUN npm run install:api

# Espone la porta su cui l'app Node.js è in ascolto
EXPOSE 3000

# Comando per avviare l'app
CMD ["npm", "start"]

