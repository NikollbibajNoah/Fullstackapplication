# Build Stage
FROM maven:3-eclipse-temurin-17 AS build

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:17-alpine

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Dynamischer Port für Cloud-Deployments (z. B. Railway, Render)
ENV PORT=8080
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
