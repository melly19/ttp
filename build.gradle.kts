plugins {
    kotlin("jvm") version "1.9.23"
    kotlin("plugin.spring") version "1.9.23"
}

group = "com.ttp"
version = "0.0.1-SNAPSHOT"

repositories {
    mavenCentral()
    google()
}

subprojects {
    apply(plugin = "kotlin")

    repositories {
        mavenCentral()
        google()
    }
}