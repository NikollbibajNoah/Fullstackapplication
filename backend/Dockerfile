# Build Stage mit Java 21
FROM maven:3-eclipse-temurin-21 AS build

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Run Stage mit Java 21
FROM eclipse-temurin:21-alpine

WORKDIR /app
COPY --from=build /app/target/*.jar backend-0.0.1-SNAPSHOT.jar

# Dynamischer Port für Cloud-Deployments
ENV PORT=8080
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
