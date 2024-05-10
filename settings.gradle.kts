pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "mosaic"
include(":app")
includeBuild("../node_modules/@react-native/gradle-plugin")
apply("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")
//applyNativeModulesSettingsGradle(settings)
apply(settings)
 