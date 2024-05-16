FROM eclipse-temurin:17-jdk-alpine


WORKDIR /app


RUN apk add --no-cache maven


COPY pom.xml .


COPY src ./src


EXPOSE 8081


RUN mvn package


CMD ["java", "-jar", "target/dailydump-post-service-0.0.1-SNAPSHOT.jar"]
