package com.ttp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class AuthPackage : ReactPackage {
    override fun createNativeModules(reactContact: ReactApplicationContext): List<NativeModule> {
        return listOf(AuthModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager> {
        return emptyList()
    }
}