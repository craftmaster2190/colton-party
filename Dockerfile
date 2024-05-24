FROM openjdk:17
LABEL org.opencontainers.image.source https://github.com/craftmaster2190/colton-party
VOLUME /tmp
COPY app.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
