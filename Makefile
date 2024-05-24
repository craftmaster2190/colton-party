build: clean build-npm prep-jar-with-npm-dist build-maven mv-app-jar

clean:
	rm -rf colton-party-client/dist/*
	rm -rf coltonpartyserver/src/main/resources/static/*
	rm -rf coltonpartyserver/target

build-npm:
	(cd colton-party-client && npm ci && npm run build)

prep-jar-with-npm-dist:
	mkdir coltonpartyserver/src/main/resources/static || echo
	cp -r colton-party-client/dist/colton-party-client/browser/* coltonpartyserver/src/main/resources/static/

build-maven:
	(cd coltonpartyserver && mvn clean install --batch-mode --no-transfer-progress)

mv-app-jar:
	mv coltonpartyserver/target/coltonpartyserver*.jar app.jar