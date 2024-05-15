FROM eclipse-temurin:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy the Maven wrapper and pom.xml
COPY pom.xml .

# Copy the source code
COPY src ./src

# Expose the port your Spring Boot app runs on
EXPOSE 8081

# Package the application
RUN mvn package

# Default command
CMD ["java", "-jar", "target/dailydump-post-service-0.0.1-SNAPSHOT.jar"]
