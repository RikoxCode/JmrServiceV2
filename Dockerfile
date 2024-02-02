# Verwenden Sie ein offizielles Node.js-Image als Basis und setzen Sie die Version auf eine kompatible Version
FROM node:18-alpine as builder

# Arbeitsverzeichnis erstellen und hineinwechseln
WORKDIR /app

# Kopieren Sie das Paketmanifest und installieren Sie die Abhängigkeiten
COPY JmrServiceNoSSR/package*.json ./
RUN npm install

# Kopieren Sie die restlichen Angular-Anwendungsdateien
COPY JmrServiceNoSSR .

# Build der Angular-Anwendung
RUN npm run build

# Port, den die Anwendung innerhalb des Containers verwenden wird
EXPOSE 4200
