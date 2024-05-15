FROM eclipse-temurin:17-jdk-alpine
# Use an official OpenJDK runtime as a parent image

# Set the working directory in the container
WORKDIR /dailydeump-user-service

# Copy the packaged jar file into the container
COPY target/dailydump-user-service-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080


# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
